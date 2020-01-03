import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterComponent } from './filter/filter.component';
import { GridComponent } from './grid/grid.component';
import { ReportSalesPullBasedComponent } from './report-sales-pull-based.component';
import { ReportSalesPullBasedRoutingModule } from './report-sales-pull-based.routing';
import { ReportSalesService } from './report-sales.service';


@NgModule({
  declarations: [ReportSalesPullBasedComponent, FilterComponent, GridComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportSalesPullBasedRoutingModule
  ],
  providers: [ReportSalesService]
})
export class ReportSalesPullBasedModule { }
