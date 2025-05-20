import { Component, computed, inject, Signal, signal } from '@angular/core';
import { BundesligaTableService } from "./services/bundesliga-table.service";
import { Team } from "./models/team.ui.model";
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TableComponent } from "./components/table/table.component";
import { catchError, finalize, of, switchMap, tap } from "rxjs";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";

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
    NgIf,
    TableComponent
  ]
})
export class AppComponent {

  selectedLiga = signal('bl1');
  selectedSeason = signal('2024');

  loading = signal(false);
  error = signal<string | null>(null);

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

  table: Signal<Team[] | null> = toSignal(this.table$, { initialValue: null });
}
