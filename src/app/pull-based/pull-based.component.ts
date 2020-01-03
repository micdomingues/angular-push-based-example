import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { User } from './user.interfaces';
import { PullBasedService } from './pull-based.service';


@Component({
  selector: 'app-pull-based',
  templateUrl: './pull-based.component.html',
  styleUrls: ['./pull-based.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush //Normamente não utilizado
})
export class PullBasedComponent implements OnInit {
  showButton = true;
  pagination = this.users.pagination;
  searchTerm = new FormControl();
  users$: Observable<User[]>;

  constructor(public users: PullBasedService) { }

  ngOnInit() {
    this.searchTerm.patchValue(this.users.criteria, { emitEvent: false });

    const userChanges$ = this.searchTerm.valueChanges.pipe(
      tap(_ => this.users$ = null),
      debounceTime(300),
      distinctUntilChanged(),
    );

    userChanges$
      .subscribe(value => {
        this.users.updateSearchCriteria(value);
        this.loadUsers();
      });
  }

  loadUsers() {
    this.users$ = this.users.findAllUsers();
  }

  updatePagination(pageSize: number) {
    this.users.updatePagination(pageSize);
    this.pagination = this.users.pagination;
  }

  getPageSize() {
    this.pagination = this.users.pagination;
    this.showButton = false;
  }
}
