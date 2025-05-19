import { TestBed } from '@angular/core/testing';

import { BundesligaTableService } from './bundesliga-table.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { TeamBackend } from "../models/team.backend.model";

describe('BundesligaTableService', () => {
  let service: BundesligaTableService;

  const assetsPath = "../../assets/";
  const imageSieg = assetsPath + "sieg.svg";
  const imageNiederlage = assetsPath + "niederlage.svg";
  const drawImage = assetsPath + "unentschieden.svg";
  const imageNichtGespielt = assetsPath + "nicht-gespielt.svg";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BundesligaTableService);
  });

  const backendDataMother: TeamBackend[] = [
    {
      platz: 12,
      wappen: "wappen",
      team: "Team",
      spiele: 23,
      punkte: 34,
      tore: 45,
      gegentore: 56,
      tordifferenz: 67,
      siege: 78,
      unentschieden: 89,
      niederlagen: 90,
      tendenz: ["S","N","N","U","N"],
      laufendesSpiel: undefined
    }
  ];

    it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fill up right if less than 5 games were played', ()=> {
    backendDataMother[0].tendenz = ["S","U","N"]

    expect(service.transformToUIModel(backendDataMother)[0].letzte5).toEqual([
        imageSieg,
        drawImage,
        imageNiederlage,
        imageNichtGespielt,
        imageNichtGespielt,
    ]);
  });

  it('any char not "S" not "U" nor "N" gets interpreted as "not played"', ()=> {
    backendDataMother[0].tendenz = ["S","X"," ","N","-"]

    expect(service.transformToUIModel(backendDataMother)[0].letzte5).toEqual([
        imageSieg,
        imageNichtGespielt,
        imageNichtGespielt,
        imageNiederlage,
        imageNichtGespielt,
    ]);
  });


});
