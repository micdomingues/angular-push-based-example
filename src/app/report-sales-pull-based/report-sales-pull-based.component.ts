import { Component, OnInit } from '@angular/core';

import { ReportSalesService } from './report-sales.service';
import { Router } from '@angular/router';

export interface FilterModel {
  search1: string;
  search2: string;
}

export interface ReportSalesResponse {
  sales: Array<string>;
  totalSales: number;
}


@Component({
  selector: 'app-report-sales-pull-based',
  templateUrl: './report-sales-pull-based.component.html',
  styleUrls: ['./report-sales-pull-based.component.css'],
})
export class ReportSalesPullBasedComponent implements OnInit {

  sales = new Array<string>();
  totalSales = 0;
  filter: FilterModel;
  loading = false;

  constructor(private reportSalesService: ReportSalesService, private router: Router) { }

  ngOnInit() {
    const loadFilter = this.reportSalesService.loadFilter();
    if (loadFilter) {
      this.loadData();
    } else {
      this.fetchData();
    }
  }

  onChanges(event: FilterModel): void {
    this.filter = event;
    this.fetchData();
  }


  // Ao mudar de rota, perdemos os dados do componente
  changeRouter(): void {
    this.saveData();
    this.router.navigateByUrl('empty');
  }

  private fetchData(): void {
    this.loading = true;
    this.reportSalesService.find(this.filter)
      .subscribe(([sales, totalSales]) => {
        this.sales = sales;
        this.totalSales = totalSales;
        this.loading = false;
      }, () => { } // sem tratamento de erro
        , () => this.loading = false);

  }


  // Salva no localStorage ou Service
  private saveData(): void {
    this.reportSalesService.saveFilter(this.filter);
    this.reportSalesService.saveSales(this.sales);
    this.reportSalesService.saveTotalSales(this.totalSales);
  }

  // Busca os dados do localStorage ou Service
  private loadData(): void {

    this.filter = this.reportSalesService.loadFilter();
    this.sales = this.reportSalesService.loadSales();
    this.totalSales = this.reportSalesService.loadTotalSales();
  }
}
