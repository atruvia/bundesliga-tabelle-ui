import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Team } from '../../models/team.ui.model';
import { BreakpointObserver } from "@angular/cdk/layout";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() table: Team[] | null = [];
  breakPointObserver: BreakpointObserver = inject(BreakpointObserver);
  isSmallScreen = toSignal(this.breakPointObserver.observe('(max-width: 768px)'));
  displayedColumns: string[] = [
    'platz',
    'verein',
    'spiele',
    'siege',
    'unentschieden',
    'niederlagen',
    'tore',
    'gegentore',
    'tordifferenz',
    'punkte',
    'letzte5'
  ];
}
