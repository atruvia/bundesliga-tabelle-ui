import { Component, computed, inject, signal } from '@angular/core';
import { BundesligaTableService } from "./services/bundesliga-table.service";
import { Team } from "./models/team.ui.model";
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableComponent } from "./components/table/table.component";
import { NgIf } from '@angular/common';
import { toObservable } from "@angular/core/rxjs-interop";
import { catchError, finalize, of, switchMap, tap } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatToolbar,
    MatProgressSpinner,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    NgIf,
    TableComponent
  ]
})
export class AppComponent {

  selectedLiga = signal('bl1');
  selectedSeason = signal('2025');

  loading = signal(false);
  error = signal<string | null>(null);
  table = signal<Team[] | null>(null);

  private tableService: BundesligaTableService = inject(BundesligaTableService);

  private params = computed(() => ({
    liga: this.selectedLiga(),
    season: this.selectedSeason(),
  }));

  private table$ = toObservable(this.params).pipe(
    tap(() => {
      this.loading.set(true);
      this.error.set(null);
    }),
    switchMap(({ liga, season }) =>
      this.tableService.getTableFromServer(liga, season).pipe(
        catchError(err => {
          this.error.set('Fehler beim Laden der Tabelle');
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      )
    )
  );

  constructor() {
    this.table$.subscribe(data => {
      this.table.set(data);
    });
  }

  refresh(): void {
    const { liga, season } = this.params();
    this.loading.set(true);
    this.error.set(null);
    this.tableService.getTableFromServer(liga, season).pipe(
      catchError(err => {
        this.error.set('Fehler beim Laden der Tabelle');
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe(data => {
      this.table.set(data);
    });
  }
}