# Baut die 3D-Modelle des Moduls „Anatomie“ aus dem freien Anatomie-Atlas Z-Anatomy.
#
# Quelle: https://github.com/Z-Anatomy/Models-of-human-anatomy (Z-Anatomy.zip entpacken,
# darin liegt Startup.blend). Lizenz CC BY-SA 4.0, beruht auf BodyParts3D (DBCLS).
#
# Aufruf (Blender 4 oder neuer, ohne Fenster):
#   blender -b --factory-startup --disable-autoexec <Pfad>/Startup.blend \
#       --python werkzeuge/baue_anatomie.py -- [region ...]
#
# Die weiblichen Geschlechtsorgane fehlen in Z-Anatomy (der Atlas ist männlich). Sie stammen aus
# dem Human Reference Atlas (https://humanatlas.io/3d-reference-library, CC BY 4.0, nach dem
# Visible Human der National Library of Medicine). Die GLB-Dateien liegen in
# werkzeuge/quellen/hra/ und werden über „import“ in der Region dazugeladen.
#
# „schnitt“ (zmin/zmax in Metern, Körperhöhe im Atlas) kappt lange Muskeln, Knochen und Nerven
# am Rand des Bildausschnitts.
#
# Je Region entsteht public/modelle/anatomie/<region>.glb. Jede Struktur aus
# werkzeuge/anatomie.json ist darin ein eigenes Objekt mit ihrer id als Namen.
# Die Flächen tragen eines von drei Materialien: „Haupt“, „Sehne“, „Knorpel“ –
# die Farben vergibt erst die Bühne.
#
# Was dem Atlas fehlt, lässt sich als einfache Hilfsform ergänzen. Statt eines Objektnamens steht
# dann in der Liste:
#   {"rohr": ["A", "B"], "radius": 0.004, "radius2": 0.003}
#       Röhre von der Mitte von A zur Mitte von B, an A so dick wie radius, an B wie radius2
#       (Gehörgang, Ohrtrompete). Statt eines Namens geht auch ein Punkt [x, y, z].
#   {"schlauch": [[x, y, z, breit, tief], …]}
#       Gebogener Schlauch mit ovalem Querschnitt durch die genannten Stationen; breit und tief
#       sind die halben Durchmesser quer und von vorn nach hinten (Scheide).
#   {"blase": ["A", "B", …], "rand": 0.002}  Blase, die A, B, … umschließt (Paukenhöhle)

import json
import math
import sys
from pathlib import Path

import bmesh
import bpy
from mathutils import Matrix, Vector

WURZEL = Path(__file__).resolve().parent.parent
ZIEL = WURZEL / "public" / "modelle" / "anatomie"
# Ab dieser Flächenzahl wird ein Netz vereinfacht (die Bühne braucht keine 25 000 Flächen je Muskel).
MAX_FLAECHEN = 9000
MAX_FLAECHEN_KONTEXT = 14000
# So dick (halber Durchmesser in m) ist ein Nerv oder Gefäß an seiner stärksten Stelle mindestens.
NERV_DICKE = 0.0022

MATERIAL_FUER = {"Tendon": "Sehne", "Cartilage": "Knorpel"}


def material(name):
    return bpy.data.materials.get(name) or bpy.data.materials.new(name)


def schneide(bm, hoehe, richtung):
    """Schneidet alles jenseits einer waagerechten Ebene ab und verschließt die Schnittfläche."""
    ergebnis = bmesh.ops.bisect_plane(
        bm,
        geom=bm.verts[:] + bm.edges[:] + bm.faces[:],
        plane_co=(0, 0, hoehe),
        plane_no=(0, 0, richtung),
        clear_outer=True,
    )
    kanten = [g for g in ergebnis["geom_cut"] if isinstance(g, bmesh.types.BMEdge)]
    if kanten:
        bmesh.ops.edgeloop_fill(bm, edges=kanten)


def rahmen(namen):
    """Kleinster und größter Punkt der genannten Atlas-Objekte in Weltkoordinaten."""
    punkte = []
    for n in namen:
        o = bpy.data.objects.get(n)
        if o is None:
            sys.exit(f"FEHLER: Hilfsform bezieht sich auf „{n}“, das im Atlas fehlt.")
        punkte += [o.matrix_world @ Vector(ecke) for ecke in o.bound_box]
    return (
        Vector([min(p[i] for p in punkte) for i in range(3)]),
        Vector([max(p[i] for p in punkte) for i in range(3)]),
    )


def kurve(stationen, schritte):
    """Weiche Kurve (Catmull-Rom) durch die Stationen; liefert Zwischenwerte aller Spalten."""
    punkte = [stationen[0]] + list(stationen) + [stationen[-1]]
    werte = []
    for i in range(1, len(punkte) - 2):
        p0, p1, p2, p3 = punkte[i - 1], punkte[i], punkte[i + 1], punkte[i + 2]
        for s in range(schritte):
            t = s / schritte
            werte.append([
                0.5 * (2 * b + (c - a) * t + (2 * a - 5 * b + 4 * c - d) * t * t
                       + (3 * b - a - 3 * c + d) * t ** 3)
                for a, b, c, d in zip(p0, p1, p2, p3)
            ])
    werte.append(list(stationen[-1]))
    return werte


def baue_schlauch(bm, stationen, ecken=36):
    """Ovaler Schlauch entlang einer Kurve; das untere Ende ist abgerundet, das obere flach."""
    werte = kurve(stationen, 8)
    mitten = [Vector(w[:3]) for w in werte]
    ringe = []
    for i, w in enumerate(werte):
        richtung = (mitten[min(i + 1, len(mitten) - 1)] - mitten[max(i - 1, 0)]).normalized()
        quer = Vector((1, 0, 0))
        quer = (quer - richtung * quer.dot(richtung)).normalized()
        tief = richtung.cross(quer)
        ringe.append((mitten[i], richtung, quer * w[3], tief * w[4]))
    # Abrundung am Ende: zwei kleiner werdende Ringe ein Stück weiter in Laufrichtung.
    mitte, richtung, quer, tief = ringe[-1]
    laenge = min(quer.length, tief.length)
    for anteil, vor in ((0.82, 0.45), (0.45, 0.8)):
        ringe.append((mitte + richtung * laenge * vor, richtung, quer * anteil, tief * anteil))

    reihen = []
    for mitte, _, quer, tief in ringe:
        reihe = []
        for k in range(ecken):
            winkel = 2 * math.pi * k / ecken
            reihe.append(bm.verts.new(mitte + quer * math.cos(winkel) + tief * math.sin(winkel)))
        reihen.append(reihe)
    for a, b in zip(reihen, reihen[1:]):
        for k in range(ecken):
            bm.faces.new((a[k], a[(k + 1) % ecken], b[(k + 1) % ecken], b[k]))
    bm.faces.new(reihen[0])
    bm.faces.new(reihen[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])


def baue_hilfsform(angabe, sammlung):
    """Röhre, Schlauch oder Blase für Strukturen, die der Atlas nicht als eigenes Objekt hat."""
    bm = bmesh.new()
    if "schlauch" in angabe:
        baue_schlauch(bm, angabe["schlauch"])
        lage = Matrix.Identity(4)
    elif "rohr" in angabe:
        mitten = []
        for n in angabe["rohr"]:
            if isinstance(n, str):
                unten, oben = rahmen([n])
                mitten.append((unten + oben) / 2)
            else:
                mitten.append(Vector(n))
        achse = mitten[1] - mitten[0]
        radius = angabe.get("radius", 0.004)
        bmesh.ops.create_cone(
            bm,
            cap_ends=True,
            segments=28,
            radius1=radius,
            radius2=angabe.get("radius2", radius),
            depth=achse.length,
        )
        lage = Matrix.Translation((mitten[0] + mitten[1]) / 2) @ achse.to_track_quat("Z", "Y").to_matrix().to_4x4()
    else:
        unten, oben = rahmen(angabe["blase"])
        rand = angabe.get("rand", 0.002)
        halb = (oben - unten) / 2 + Vector((rand, rand, rand))
        bmesh.ops.create_uvsphere(bm, u_segments=28, v_segments=16, radius=1)
        lage = Matrix.Translation((unten + oben) / 2) @ Matrix.Diagonal((*halb, 1))
    bmesh.ops.transform(bm, matrix=lage, verts=bm.verts)
    netz = bpy.data.meshes.new("hilfsform")
    bm.to_mesh(netz)
    bm.free()
    for flaeche in netz.polygons:
        flaeche.use_smooth = True
    objekt = bpy.data.objects.new("hilfsform", netz)
    sammlung.objects.link(objekt)
    return objekt


def baue_objekt(name, quellen, sammlung, tiefen, max_flaechen, schnitt):
    """Verschmilzt die ausgewerteten Netze der Quellobjekte (in Weltkoordinaten) zu einem Objekt."""
    bm = bmesh.new()
    namen = ["Haupt", "Sehne", "Knorpel"]
    for quelle in quellen:
        ausgewertet = quelle.evaluated_get(tiefen)
        netz = bpy.data.meshes.new_from_object(ausgewertet, depsgraph=tiefen)
        netz.transform(quelle.matrix_world)
        zuordnung = [
            namen.index(MATERIAL_FUER.get(s.material.name if s.material else "", "Haupt"))
            for s in quelle.material_slots
        ] or [0]
        vorher = len(bm.faces)
        bm.from_mesh(netz)
        bm.faces.ensure_lookup_table()
        for flaeche in bm.faces[vorher:]:
            flaeche.material_index = zuordnung[min(flaeche.material_index, len(zuordnung) - 1)]
        bpy.data.meshes.remove(netz)

    if "zmax" in schnitt:
        schneide(bm, schnitt["zmax"], 1)
    if "zmin" in schnitt:
        schneide(bm, schnitt["zmin"], -1)
    if not bm.faces:
        sys.exit(f"FEHLER: „{name}“ hat keine Flächen (ganz weggeschnitten oder leere Kurve).")
    bmesh.ops.triangulate(bm, faces=bm.faces[:])
    ergebnis = bpy.data.meshes.new(name)
    bm.to_mesh(ergebnis)
    anzahl = len(bm.faces)
    bm.free()
    for n in namen:
        ergebnis.materials.append(material(n))

    objekt = bpy.data.objects.new(name, ergebnis)
    sammlung.objects.link(objekt)
    if anzahl > max_flaechen:
        objekt.modifiers.new("Vereinfachen", "DECIMATE").ratio = max_flaechen / anzahl
    return objekt, anzahl


def baue_region(region, plan):
    szene = bpy.context.scene
    # Die Quellobjekte in eine eigene, sichtbare Sammlung hängen, damit Blender
    # ihre Modifikatoren (Dicke der Bänder, Glättung) wirklich auswertet.
    quelle_sammlung = bpy.data.collections.new(f"quelle-{region}")
    ziel_sammlung = bpy.data.collections.new(f"export-{region}")
    szene.collection.children.link(quelle_sammlung)
    szene.collection.children.link(ziel_sammlung)

    fehlend = []

    for pfad in plan.get("import", []):
        bpy.ops.import_scene.gltf(filepath=str(WURZEL / pfad))

    def hole(namen):
        objekte = []
        for n in namen:
            if isinstance(n, dict):
                objekte.append(baue_hilfsform(n, quelle_sammlung))
                continue
            o = bpy.data.objects.get(n)
            if o is None or o.type not in ("MESH", "CURVE"):
                fehlend.append(n)
                continue
            if o.type == "CURVE" and o.data.bevel_object is None:
                # Nerven und Gefäße sind Linien, deren Dicke aus bevel_depth × Punktradius entsteht.
                # Der Atlas zeichnet sie sehr fein; dünne Stränge bis zur Mindestdicke anheben,
                # dicke (Ischiasnerv) unverändert lassen.
                radien = [
                    punkt.radius
                    for zug in o.data.splines
                    for punkt in (zug.bezier_points if zug.type == "BEZIER" else zug.points)
                ]
                groesster = max(radien, default=1.0) or 1.0
                if o.data.bevel_depth * groesster < NERV_DICKE:
                    o.data.bevel_depth = NERV_DICKE / groesster
                    o.data.bevel_resolution = 2
                    o.data.fill_mode = "FULL"
            if o.name not in quelle_sammlung.objects:
                quelle_sammlung.objects.link(o)
            o.hide_viewport = False
            o.hide_set(False) if o.name in bpy.context.view_layer.objects else None
            objekte.append(o)
        return objekte

    gruppen = {sid: hole(namen) for sid, namen in plan["strukturen"].items()}
    kontext = hole(plan.get("kontext", []))
    if fehlend:
        sys.exit(f"FEHLER: In der Blender-Datei fehlen (Region {region}): " + "; ".join(fehlend))
    schnitt = plan.get("schnitt", {})
    bpy.context.view_layer.update()
    tiefen = bpy.context.evaluated_depsgraph_get()

    fertige = []
    for sid, objekte in gruppen.items():
        objekt, anzahl = baue_objekt(sid, objekte, ziel_sammlung, tiefen, MAX_FLAECHEN, schnitt)
        print(f"  {sid:24} {anzahl:7} Dreiecke")
        fertige.append(objekt)
    if kontext:
        objekt, anzahl = baue_objekt(
            "kontext", kontext, ziel_sammlung, tiefen, MAX_FLAECHEN_KONTEXT, schnitt
        )
        print(f"  {'kontext':24} {anzahl:7} Dreiecke")
        fertige.append(objekt)

    bpy.ops.object.select_all(action="DESELECT")
    for objekt in fertige:
        objekt.select_set(True)
    bpy.context.view_layer.objects.active = fertige[0]

    ZIEL.mkdir(parents=True, exist_ok=True)
    datei = ZIEL / f"{region}.glb"
    bpy.ops.export_scene.gltf(
        filepath=str(datei),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_texcoords=False,
        export_normals=True,
        export_materials="EXPORT",
        export_animations=False,
        export_cameras=False,
        export_lights=False,
    )
    print(f"{region}: {datei} ({datei.stat().st_size / 1e6:.1f} MB)")

    # Aufräumen: Sonst hieße „harnblase“ in der nächsten Region „harnblase.001“.
    for objekt in fertige:
        netz = objekt.data
        bpy.data.objects.remove(objekt)
        bpy.data.meshes.remove(netz)


def main():
    plan = json.loads((WURZEL / "werkzeuge" / "anatomie.json").read_text(encoding="utf-8"))
    plan.pop("_hinweis", None)
    argumente = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    for region in argumente or list(plan):
        if region not in plan:
            sys.exit(f"FEHLER: Region „{region}“ steht nicht in werkzeuge/anatomie.json.")
        baue_region(region, plan[region])


main()
