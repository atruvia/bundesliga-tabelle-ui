import { Component, Input } from '@angular/core';
import { BundesligaTableService } from "./services/bundesliga-table.service";
import { Team } from "./models/team.ui.model";
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
  imports: [
    NgClass,
    MatFormField,
    MatSelect,
    MatOption,
    MatToolbar,
    MatProgressSpinner,
    NgIf,
    NgForOf
  ]
})
export class AppComponent  {

  @Input() table: Team[] = [];
  selectedLiga = 'bl1';
  selectedSeason = '2024'
  loading = false;
  error: boolean;
  constructor(private tableService: BundesligaTableService) {
    this.updateTable();
  }

  updateTable() {
    this.loading = true;
    this.tableService.getTableFromServer(this.selectedLiga, this.selectedSeason).subscribe(result => {
      this.table = result
      this.loading = false;
    }, () => {
      this.loading = false;
      this.error = true;
    });
  }
}
