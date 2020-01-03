import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportSalesPullBasedComponent } from './report-sales-pull-based.component';

const ROUTES: Routes = [{
  path: '',
  component: ReportSalesPullBasedComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ReportSalesPullBasedRoutingModule { }
