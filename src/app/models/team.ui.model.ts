export interface Team {
  platz: number;
  wappen: string;
  team: string;
  shortName: string;
  spiele: number;
  punkte: number;
  tore: number;
  gegentore: number;
  tordifferenz: number;
  siege: number;
  unentschieden: number;
  niederlagen: number;
  letzte5: string[];
  laufendesSpiel?: LaufendesSpiel;
}

export type LaufendesSpiel = {
  ergebnis: string;
  spielstand: string;
}
