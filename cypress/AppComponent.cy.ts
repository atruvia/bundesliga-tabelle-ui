import {AppComponent} from "../src/app/app.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BundesligaTableService } from "../src/app/services/bundesliga-table.service";
import { Observable, of } from "rxjs";
import { Team } from "../src/app/models/team.ui.model";

let tableService = {
  getTableFromServer(liga: string, saison: string): Observable<Team[]> {
    return of([{
      "platz": 1,
      "wappen": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/560px-Borussia_Dortmund_logo.svg.png",
      "team": "Borussia Dortmund",
      "spiele": 25,
      "punkte": 53,
      "tore": 55,
      "gegentore": 31,
      "tordifferenz": 24,
      "siege": 17,
      "unentschieden": 2,
      "niederlagen": 6,
      "letzte5": [
        "../../assets/sieg.svg",
        "../../assets/niederlage.svg",
        "../../assets/niederlage.svg",
        "../../assets/niederlage.svg",
        "../../assets/niederlage.svg"
      ]
    }]);
  }
};

describe('AppComponent.cy.ts', () => {
  it('mounts', () => {
    cy.mount(AppComponent, {
      imports: [HttpClientTestingModule]
    });
  });

  it('displays one team', () => {
    cy.mount(AppComponent, {
      imports: [HttpClientTestingModule],
      providers: [{provide: BundesligaTableService, useValue: tableService}],
    });
    cy.get('[data-cy="teamname"]').should('have.text', 'Borussia Dortmund');
  });
});
