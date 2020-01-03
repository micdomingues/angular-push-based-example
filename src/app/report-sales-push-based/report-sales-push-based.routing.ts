import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportSalesPushBasedComponent } from './report-sales-push-based.component';

const ROUTES: Routes = [{
  path: '',
  component: ReportSalesPushBasedComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ReportSalesPushBasedRoutingModule { }
