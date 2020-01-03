import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ReportSalesFacade, SalesState } from './report-sales.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-sales-push-based',
  templateUrl: './report-sales-push-based.component.html',
  styleUrls: ['./report-sales-push-based.component.css']
})
export class ReportSalesPushBasedComponent implements OnInit {

  vm$: Observable<SalesState> = this.facade.vm$;

  constructor(public facade: ReportSalesFacade, private router: Router) { }

  ngOnInit() {
  }

  changeRouter(): void {
    this.router.navigateByUrl('empty');
  }
}
