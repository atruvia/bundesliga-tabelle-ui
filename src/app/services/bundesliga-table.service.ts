import {Injectable} from '@angular/core';
import {map, Observable, of} from "rxjs";
import {TeamBackend} from "../models/team.backend.model";
import {Team} from "../models/team.ui.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BundesligaTableService {

  constructor(private httpClient: HttpClient) {
  }

  getTableFromServer(liga: string, saison: string, url = ''): Observable<Team[]> {
    return this.httpClient.get(url + '/tabelle/' + liga + '/' + saison)
      .pipe(map(table => this.transformToUIModel(table as TeamBackend[])));
  }

  transformToUIModel(teamBackend: TeamBackend[]): Team[] {
    const table: Team[] = [];
    teamBackend.forEach(t => table.push(this.transformBackendTeam(t)));
    return table;
  }

  private transformBackendTeam(teamBackend: TeamBackend): Team {
    const laufendesSpielString = teamBackend.laufendesSpiel ? `${teamBackend.laufendesSpiel.tore}-${teamBackend.laufendesSpiel.toreGegner}` : null;
    const team: Team = {
      platz: teamBackend.platz,
      wappen: teamBackend.wappen,
      team: teamBackend.team,
      spiele: teamBackend.spiele,
      punkte: teamBackend.punkte,
      tore: teamBackend.tore,
      gegentore: teamBackend.gegentore,
      tordifferenz: teamBackend.tordifferenz,
      siege: teamBackend.siege,
      unentschieden: teamBackend.unentschieden,
      niederlagen: teamBackend.niederlagen,
      letzte5: [],
      laufendesSpiel: laufendesSpielString
    }

    teamBackend.letzte5.padEnd(5, ' ').substring(0, 5).split('').forEach(char => {
      switch (char) {
        case 'S':
          team.letzte5.push('../../assets/sieg.svg');
          break;
        case 'U':
          team.letzte5.push('../../assets/unentschieden.svg');
          break;
        case 'N':
          team.letzte5.push('../../assets/niederlage.svg');
          break;
        default:
          team.letzte5.push('../../assets/nicht-gespielt.svg');
          break;
      }
    });

    return team;
  }
}
