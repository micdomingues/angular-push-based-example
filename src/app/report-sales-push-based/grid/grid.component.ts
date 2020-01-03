import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-push-based',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridPushBasedComponent implements OnInit {

  @Input()
  sales: Array<string>;

  constructor() { }

  ngOnInit() {
  }

}
