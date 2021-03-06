import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Pagination, RandomUserResponse, User } from './user.interfaces';


@Injectable()
export class PullBasedService {

  users: User[] = [];
  criteria = 'ngDominican';
  pagination: Pagination = {
    selectedSize: 5,
    currentPage: 0,
    pageSizes: [5, 10, 20, 50]
  };

  constructor(private readonly http: HttpClient) { }

  findAllUsers(): Observable<User[]> {
    const url = this.buildUserUrl(this.criteria, this.pagination);
    const request$ = this.http.get<RandomUserResponse>(url).pipe(
      map(response => response.results),
      tap(list => this.users = list)
    );

    return request$;
  }

  updatePagination(selectedSize: number) {
    this.pagination = {
      ...this.pagination,
      selectedSize
    };
  }

  updateSearchCriteria(criteria: string) {
    this.criteria = criteria;
    console.log('Updated Search Criteria: ', this.criteria);
  }

  private buildUserUrl(criteria: string, pagination: Pagination): string {
    const URL = 'https://randomuser.me/api/';
    const currentPage = `page=${pagination.currentPage}`;
    const pageSize = `results=${pagination.selectedSize}&`;
    const searchFor = `seed=${criteria}`;

    return `${URL}?${searchFor}&${pageSize}&${currentPage}`;
  }
}
