export interface TeamBackend {
  platz: number;
  wappen: string;
  team: string;
  spiele: number;
  punkte: number;
  tore: number;
  gegentore: number;
  tordifferenz: number;
  siege: number;
  unentschieden: number;
  niederlagen: number;
  letzte5: string;
  laufendesSpiel: {
    ergebnis: string;
    tore: number;
    toreGegner: number;
  };
}
