import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Team } from '../../models/team.ui.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() table: Team[] | null = [];

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
