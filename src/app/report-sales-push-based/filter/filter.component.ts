import { Component, OnInit } from '@angular/core';

import { ReportSalesFacade } from '../report-sales.facade';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-pushed',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterPushedComponent implements OnInit {

  // Não controla seu valor inicial
  byTid: FormControl;
  byNsu: FormControl;

  constructor(public facade: ReportSalesFacade) { }

  ngOnInit() {


    this.byNsu = this.facade.buildSearch1Control();
    this.byTid = this.facade.buildSearch2Control();

    const { search1, search2 } = this.facade.filterSnapshot;

    this.byNsu.patchValue(search1, { emitEvent: false });
    this.byTid.patchValue(search2, { emitEvent: false });

    this.facade.updateSearch1('Default 3');


  }

}
