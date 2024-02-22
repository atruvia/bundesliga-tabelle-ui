import {AppComponent} from "../src/app/app.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BundesligaTableService } from "../src/app/services/bundesliga-table.service";
import { Observable, of, throwError } from "rxjs";
import { Team } from "../src/app/models/team.ui.model";

let tableService = {
  getTableFromServer(liga: string, saison: string): Observable<Team[]> {
    return of([{
      "platz": 12,
      "wappen": "https://i.imgur.com/jJEsJrj.png",
      "team": "Ein recht langer Teamname",
      "spiele": 23,
      "punkte": 34,
      "tore": 45,
      "gegentore": 56,
      "tordifferenz": 67,
      "siege": 78,
      "unentschieden": 89,
      "niederlagen": 90,
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

let errorTableService = {
  getTableFromServer(liga: string, saison: string): Observable<Team[]> {
    return throwError('error');
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
    cy.get('[data-cy="platz"]').should('have.text', '12.'); // <-- dot gets appended :)
    cy.get('[data-cy="wappen"]').should('have.attr', 'src', 'https://i.imgur.com/jJEsJrj.png');
    cy.get('[data-cy="teamname"]').should('have.text', 'Ein recht langer Teamname');
    cy.get('[data-cy="spiele"]').should('have.text', '23');
    cy.get('[data-cy="punkte"]').should('have.text', '34');
    cy.get('[data-cy="tore"]').should('have.text', '45');
    cy.get('[data-cy="gegentore"]').should('have.text', '56');
    cy.get('[data-cy="tordifferenz"]').should('have.text', '67');
    cy.get('[data-cy="siege"]').should('have.text', '78');
    cy.get('[data-cy="unentschieden"]').should('have.text', '89');
    cy.get('[data-cy="niederlagen"]').should('have.text', '90');
    // cy.get('[data-cy="letzte5"]').should('have.text', '');
  });

  it('shows error when backend is not available', () => {
    cy.mount(AppComponent, {
      imports: [HttpClientTestingModule],
      providers: [{provide: BundesligaTableService, useValue: errorTableService}],
    });
    cy.get('[data-cy="error"]').should('have.text', 'Fehler beim Laden der Tabelle');
  });
});
