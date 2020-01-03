import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterPushedComponent as FilterPushBasedComponent } from './filter/filter.component';
import { GridPushBasedComponent } from './grid/grid.component';
import { ReportSalesPushBasedComponent } from './report-sales-push-based.component';
import { ReportSalesFacade } from './report-sales.facade';
import { ReportSalesPushBasedRoutingModule } from './report-sales-push-based.routing';

@NgModule({
    declarations: [
        ReportSalesPushBasedComponent,
        FilterPushBasedComponent,
        GridPushBasedComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ReportSalesPushBasedRoutingModule,
    ],
    providers: [ReportSalesFacade]
})
export class ReportSalesPushBasedModule { }
