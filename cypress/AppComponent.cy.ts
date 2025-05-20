import { AppComponent } from "../src/app/app.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BundesligaTableService } from "../src/app/services/bundesliga-table.service";
import { Observable, of, throwError } from "rxjs";
import { Team } from "../src/app/models/team.ui.model";
import { TableComponent } from "../src/app/components/table/table.component";

const team = {
  "platz": 12,
  "wappen": "https://i.imgur.com/jJEsJrj.png",
  "team": "Ein recht langer Teamname",
  "shortName": "kurzname",
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
  ],
  laufendesSpiel: {
    ergebnis: 'S',
    spielstand: '1-0'
  }
};

let tableService = {
  getTableFromServer(): Observable<Team[]> {
    return of([team]);
  }
};

let errorTableService = {
  getTableFromServer(): Observable<Team[]> {
    return throwError(() => new Error('error'));
  }
};

describe('AppComponent.cy.ts', () => {
  it('mounts', () => {
    cy.mount(AppComponent, {
      imports: [HttpClientTestingModule, TableComponent]
    });
  });

  it('displays one team', () => {
    cy.mount(AppComponent, {
      imports: [HttpClientTestingModule],
      providers: [{provide: BundesligaTableService, useValue: tableService}],
    });
    cy.viewport("macbook-16");

    cy.get('[data-cy="platz"]').should('have.text', '12');
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
    cy.get('[data-cy="running-game"]').should('have.text', '1-0');
    cy.get('[data-cy="running-game"]').should('have.css', 'background-color', 'rgb(0, 128, 0)');

    cy.viewport("iphone-xr"); // team name should switch to shortName property on small viewport

    cy.get('[data-cy="teamname"]').should('have.text', 'kurzname');
  });

  it('displays running loosing game', () => {
    team.laufendesSpiel = {
      ergebnis: 'N',
      spielstand: '0-1',
    }

    cy.mount(AppComponent, {
      imports: [HttpClientTestingModule],
      providers: [{provide: BundesligaTableService, useValue: tableService}],
    });

    cy.get('[data-cy="running-game"]').should('have.text', '0-1');
    cy.get('[data-cy="running-game"]').should('have.css', 'background-color', 'rgb(255, 0, 0)');
  });

  it('displays running drawn game', () => {
    team.laufendesSpiel = {
      ergebnis: 'U',
      spielstand: '1-1',
    }

    cy.mount(AppComponent, {
      imports: [HttpClientTestingModule],
      providers: [{provide: BundesligaTableService, useValue: tableService}],
    });

    cy.get('[data-cy="running-game"]').should('have.text', '1-1');
    cy.get('[data-cy="running-game"]').should('have.css', 'background-color', 'rgb(128, 128, 128)');
  })

  it('shows error when backend is not available', () => {
    cy.mount(AppComponent, {
      imports: [HttpClientTestingModule],
      providers: [{provide: BundesligaTableService, useValue: errorTableService}],
    });
    cy.get('[data-cy="error"]').should('have.text', 'Fehler beim Laden der Tabelle');
  });
});
