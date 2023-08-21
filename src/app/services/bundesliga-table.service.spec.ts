import { TestBed } from '@angular/core/testing';

import { BundesligaTableService } from './bundesliga-table.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('BundesligaTableService', () => {
  let service: BundesligaTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BundesligaTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map backend model to frontend model', ()=> {
    const testDataFromBackend = [
      {
        "platz": 1,
        "wappen": "wappen",
        "team": "Team",
        "spiele": 2,
        "punkte": 3,
        "tore": 4,
        "gegentore": 5,
        "tordifferenz": -1,
        "siege": 6,
        "unentschieden": 7,
        "niederlagen": 8,
        "letzte5": "SNNNN"
      }
    ];

    expect(service.transformToUIModel(testDataFromBackend)).toEqual([{
      "platz": 1,
      "wappen": "wappen",
      "team": "Team",
      "spiele": 2,
      "punkte": 3,
      "tore": 4,
      "gegentore": 5,
      "tordifferenz": -1,
      "siege": 6,
      "unentschieden": 7,
      "niederlagen": 8,
      "letzte5": [
        "../../assets/sieg.svg",
        "../../assets/niederlage.svg",
        "../../assets/niederlage.svg",
        "../../assets/niederlage.svg",
        "../../assets/niederlage.svg"
      ]
    }]);
  });

  it('should fill up right if less than 5 games were played, any char not SUN will be ignored', ()=> {
    const testDataFromBackend = [
      {
        "platz": 1,
        "wappen": "wappen",
        "team": "Team",
        "spiele": 2,
        "punkte": 3,
        "tore": 4,
        "gegentore": 5,
        "tordifferenz": -1,
        "siege": 6,
        "unentschieden": 7,
        "niederlagen": 8,
        "letzte5": "SUN-"
      }
    ];

    expect(service.transformToUIModel(testDataFromBackend)).toEqual([{
      "platz": 1,
      "wappen": "wappen",
      "team": "Team",
      "spiele": 2,
      "punkte": 3,
      "tore": 4,
      "gegentore": 5,
      "tordifferenz": -1,
      "siege": 6,
      "unentschieden": 7,
      "niederlagen": 8,
      "letzte5": [
        "../../assets/sieg.svg",
        "../../assets/unentschieden.svg",
        "../../assets/niederlage.svg",
        "../../assets/nicht-gespielt.svg",
        "../../assets/nicht-gespielt.svg",
      ]
    }]);
  });
});
