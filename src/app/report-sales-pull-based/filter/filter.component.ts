import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReportSalesService } from '../report-sales.service';
import { FilterModel } from '../report-sales-pull-based.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output()
  filterChanged = new EventEmitter<FilterModel>();

  byNsu = 'Default 1';
  byTid = 'Default 2';

  constructor(private reportSalesService: ReportSalesService) { }

  ngOnInit() {

    const savedFilter = this.reportSalesService.loadFilter();
    if (savedFilter) {
      this.byNsu = savedFilter.search1;
      this.byTid = savedFilter.search2;
    }

  }

  onFilterChanged() {
    this.filterChanged.emit({ search1: this.byNsu, search2: this.byTid });
  }

}
