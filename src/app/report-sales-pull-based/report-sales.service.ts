import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { FilterModel } from './report-sales-pull-based.component';

@Injectable({ providedIn: 'root' })
export class ReportSalesService {

  salesSaved: Array<string>;
  totalSalesSaved: number;
  filterSaved: FilterModel;

  find(filter: FilterModel): Observable<[Array<string>, number]> {
    const findSales = this.findSales(filter);
    const findSummary = this.findSummary(filter);
    return forkJoin(findSales, findSummary);
  }

  private findSales(filter: FilterModel): Observable<Array<string>> {
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

  private findSummary(filter: FilterModel): Observable<number> {
    return of({})
      .pipe(
        delay(500),
        map(_ => {
          return Math.floor(Math.random() * 100000);
        }),
      );
  }

  saveFilter(filter: FilterModel): void {
    this.filterSaved = filter;
  }

  loadFilter(): FilterModel {
    return this.filterSaved;
  }

  saveSales(sales: Array<string>): void {
    this.salesSaved = sales;
  }

  loadSales(): Array<string> {
    return this.salesSaved;
  }

  saveTotalSales(totalSales: number): void {
    this.totalSalesSaved = totalSales;
  }

  loadTotalSales(): number {
    return this.totalSalesSaved;
  }
}
