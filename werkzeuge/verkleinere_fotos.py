"""Verkleinert die Wahrzeichen-Fotos der Länderseiten und räumt nicht mehr benutzte Dateien weg.

    python werkzeuge/verkleinere_fotos.py

Nach werkzeuge/baue_laenderinfo.mjs aufrufen. Auf der Bühne ist ein Foto höchstens 820 px
breit; 1000 px reichen auch für große Bildschirme. Braucht Pillow.
"""

import json
from pathlib import Path

from PIL import Image, ImageOps

WURZEL = Path(__file__).resolve().parent.parent
ORDNER = WURZEL / 'public' / 'bilder' / 'laender' / 'wahrzeichen'
DATEN = WURZEL / 'src' / 'module' / 'reiseimpfung' / 'daten' / 'steckbriefe.json'
BREITE = 1000

benutzt = {
    w['bild']
    for land in json.loads(DATEN.read_text(encoding='utf8'))['laender'].values()
    for w in land['wahrzeichen']
}

geloescht = verkleinert = 0
vorher = nachher = 0
for datei in sorted(ORDNER.glob('*.jpg')):
    if datei.name not in benutzt:
        datei.unlink()
        geloescht += 1
        continue
    groesse = datei.stat().st_size
    vorher += groesse
    with Image.open(datei) as bild:
        bild = ImageOps.exif_transpose(bild)
        if bild.width <= BREITE and groesse < 180_000:
            nachher += groesse
            continue
        if bild.width > BREITE:
            bild = bild.resize((BREITE, round(bild.height * BREITE / bild.width)), Image.LANCZOS)
        bild.convert('RGB').save(datei, 'JPEG', quality=76, optimize=True, progressive=True)
    verkleinert += 1
    nachher += datei.stat().st_size

print(f'{verkleinert} verkleinert, {geloescht} unbenutzte gelöscht, {vorher / 1e6:.0f} MB -> {nachher / 1e6:.0f} MB')
