import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TableComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should name the opposite team as hover text on a running game', () => {
    component.table = [{
      platz: 1,
      wappen: '',
      team: 'Holstein Kiel',
      shortName: 'Kiel',
      spiele: 26,
      punkte: 52,
      tore: 50,
      gegentore: 34,
      tordifferenz: 16,
      siege: 16,
      unentschieden: 4,
      niederlagen: 7,
      letzte5: [],
      laufendesSpiel: {
        ergebnis: 'S',
        spielstand: '1-0',
        gegner: 'FC Hansa Rostock'
      }
    }];
    fixture.detectChanges();

    const runningGame = fixture.nativeElement.querySelector('[data-cy="running-game"]');
    expect(runningGame.getAttribute('title')).toBe('FC Hansa Rostock');
  });
});
