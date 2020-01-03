import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { PushBaseFacade } from './push-based.service';
import { UserState } from './user.interfaces';


@Component({
  selector: 'app-push-based',
  templateUrl: './push-based.component.html',
  styleUrls: ['./push-based.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PushBasedComponent implements OnInit {
  searchTerm: FormControl;
  showButton = true;
  vm$: Observable<UserState> = this.facade.vm$;

  constructor(public facade: PushBaseFacade) { }

  ngOnInit() {
    const { criteria } = this.facade.getStateSnapshot();

    this.searchTerm = this.facade.buildSearchTermControl();
    this.searchTerm.patchValue(criteria, { emitEvent: false });
  }

  getPageSize() {
    this.showButton = false;
  }
}
