import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { delay, distinctUntilChanged, map, switchMap, tap, debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


export interface SalesState {
  sales: Array<string>;
  totalSales: number;
  loading: boolean;
}

export interface FilterState {
  search1: string;
  search2: string;
}

@Injectable({ providedIn: 'root' })
export class ReportSalesFacade {

  private state = this.initialState();
  private store = new BehaviorSubject<SalesState>(this.state);
  private state$ = this.store.asObservable();

  // Poderia ser outro facade, por exemplo.
  private filterState = this.filterInitialState();
  private filterStore = new BehaviorSubject<FilterState>(this.filterState);
  private filterState$ = this.filterStore.asObservable();


  // Cria streams de cada variável que pode ser utilizada a partir do estado inicial
  sales$ = this.state$.pipe(map(state => state.sales), distinctUntilChanged());
  totalSales$ = this.state$.pipe(map(state => state.totalSales), distinctUntilChanged());
  loading$ = this.state$.pipe(map(state => state.loading));

  search1$ = this.filterState$.pipe(map(state => state.search1), distinctUntilChanged());
  search2$ = this.filterState$.pipe(map(state => state.search2), distinctUntilChanged());

  /**
   * ViewModel que retorna todos dados de uma vez quando estiver pronto ou for alterado
   */
  vm$: Observable<SalesState> = combineLatest(this.sales$, this.totalSales$, this.loading$).pipe(
    map(([sales, totalSales, loading]) => {
      return { sales, totalSales, loading };
    })
  );

  constructor() {

    // Combina as buscas (quando alguma for alterada, ele junta as duas e faz a busca)
    combineLatest(this.search1$, this.search2$).pipe(
      tap(() => this.updateState({ ...this.state, loading: true })),
      switchMap(([search1, search2]) => {
        return this.find({ search1, search2 });
      })
    ).subscribe(([sales, totalSales]) => {
      this.updateState({ ...this.state, sales, totalSales, loading: false });
    });
  }

  //  --------- Public Methods -----------

  buildSearch1Control(): FormControl {
    const searchTerm = new FormControl();
    searchTerm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => this.updateSearch1(value));

    return searchTerm;
  }

  buildSearch2Control(): FormControl {
    const searchTerm = new FormControl();
    searchTerm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => this.updateSearch2(value));

    return searchTerm;
  }

  // Caso precise de uma cópia do objeto no ngOnInit de forma síncrona.
  get salesSnapshot(): SalesState {
    return { ...this.state };
  }

  get filterSnapshot(): FilterState {
    return { ...this.filterState };
  }

  // Atualmente poderia ser privado, mas, a ideia é que fique publico
  updateSearch1(search1: string): void {
    this.updateFilterState({ ...this.filterState, search1 });
  }

  // Atualmente poderia ser privado, mas, a ideia é que fique publico
  updateSearch2(search2: string): void {
    this.updateFilterState({ ...this.filterState, search2 });
  }

  // ------ Private Methods -------------

  // MESMO método do service do pull-based
  private find(filter: FilterState): Observable<[Array<string>, number]> {
    const findSales = this.findSales(filter);
    const findSummary = this.findSummary(filter);
    return forkJoin(findSales, findSummary);
  }

  private findSales(filter: FilterState): Observable<Array<string>> {
    return of(['D1 - ', 'D2 - ', 'D3 - ', 'D4 - '])
      .pipe(
        delay(2000),
        map((days: Array<string>) => {
          return days.map(day =>
            day + Math.floor(Math.random() * 1000).toString()
          );
        }),
      );
  }

  private findSummary(filter: FilterState): Observable<number> {
    return of({})
      .pipe(
        delay(500),
        map(_ => {
          return Math.floor(Math.random() * 100000);
        }),
      );
  }

  private updateState(state: SalesState): void {
    this.store.next(this.state = state);
  }

  private updateFilterState(filter: FilterState): void {
    this.filterStore.next(this.filterState = filter);
  }

  private initialState(): SalesState {
    return {
      sales: [],
      totalSales: 0,
      loading: false
    };
  }

  private filterInitialState(): FilterState {
    return {
      search1: 'Default 1',
      search2: 'Default 2'
    };
  }
}
