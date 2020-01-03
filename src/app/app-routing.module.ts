import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/push',
    pathMatch: 'full'
  },
  {
    path: 'push',
    loadChildren: () => import('./report-sales-push-based/report-sales-push-based.module').then(m => m.ReportSalesPushBasedModule),
  },
  {
    path: 'pull',
    loadChildren: () => import('./report-sales-pull-based/report-sales-pull-based.module').then(m => m.ReportSalesPullBasedModule),
  },
  {
    path: 'empty',
    component: EmptyComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
