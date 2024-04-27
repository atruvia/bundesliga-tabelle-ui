export interface Team {
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
  letzte5: string[];
  laufendesSpiel: string | null;
}
