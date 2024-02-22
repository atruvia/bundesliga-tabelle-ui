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
        "platz": 12,
        "wappen": "wappen",
        "team": "Team",
        "spiele": 23,
        "punkte": 34,
        "tore": 45,
        "gegentore": 56,
        "tordifferenz": 67,
        "siege": 78,
        "unentschieden": 89,
        "niederlagen": 90,
        "letzte5": "SNNNN"
      }
    ];

    expect(service.transformToUIModel(testDataFromBackend)).toEqual([{
      "platz": 12,
      "wappen": "wappen",
      "team": "Team",
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
  });

  it('should fill up right if less than 5 games were played', ()=> {
    const testDataFromBackend = [
      {
        "platz": 12,
        "wappen": "wappen",
        "team": "Team",
        "spiele": 23,
        "punkte": 34,
        "tore": 45,
        "gegentore": 56,
        "tordifferenz": 67,
        "siege": 78,
        "unentschieden": 89,
        "niederlagen": 90,
        "letzte5": "SUN"
      }
    ];

    expect(service.transformToUIModel(testDataFromBackend)).toEqual([{
      "platz": 12,
      "wappen": "wappen",
      "team": "Team",
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
        "../../assets/unentschieden.svg",
        "../../assets/niederlage.svg",
        "../../assets/nicht-gespielt.svg",
        "../../assets/nicht-gespielt.svg",
      ]
    }]);
  });

  it('any char not SUN gets interprted as not played', ()=> {
    const testDataFromBackend = [
      {
        "platz": 12,
        "wappen": "wappen",
        "team": "Team",
        "spiele": 23,
        "punkte": 34,
        "tore": 45,
        "gegentore": 56,
        "tordifferenz": 67,
        "siege": 78,
        "unentschieden": 89,
        "niederlagen": 90,
        "letzte5": "SX N-"
      }
    ];

    expect(service.transformToUIModel(testDataFromBackend)).toEqual([{
      "platz": 12,
      "wappen": "wappen",
      "team": "Team",
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
        "../../assets/nicht-gespielt.svg",
        "../../assets/nicht-gespielt.svg",
        "../../assets/niederlage.svg",
        "../../assets/nicht-gespielt.svg",
      ]
    }]);
  });


});
