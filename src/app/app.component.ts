import {Component, Input} from '@angular/core';
import {BundesligaTableService} from "./services/bundesliga-table.service";
import {Team} from "./models/team.ui.model";
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatOption, MatSelectModule } from '@angular/material/select';
import { NgIf, NgFor, NgClass, CommonModule, NgForOf } from '@angular/common';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
