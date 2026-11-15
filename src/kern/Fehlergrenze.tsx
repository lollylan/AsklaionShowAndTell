import { Component, type ReactNode } from 'react';

interface Props {
  /** Was statt des abgestürzten Inhalts gezeigt wird. */
  ersatz: ReactNode;
  children: ReactNode;
}

/**
 * Fängt Fehler eines einzelnen Moduls ab, damit ein Programmierfehler dort
 * nicht den ganzen Bildschirm leert. Mit `key` versehen, damit sie sich beim
 * Modulwechsel zurücksetzt.
 */
export class Fehlergrenze extends Component<Props, { fehler: boolean }> {
  state = { fehler: false };

  static getDerivedStateFromError() {
    return { fehler: true };
  }

  componentDidCatch(fehler: unknown) {
    console.error('Fehler in einem Modul:', fehler);
  }

  render() {
    return this.state.fehler ? this.props.ersatz : this.props.children;
  }
}
