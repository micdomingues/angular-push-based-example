import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';



export interface FeatureToggleModel {
  key: string;
  enabled: boolean;
}
@Injectable({ providedIn: 'root' })
export class FeatureToggleRepository {

  private readonly fallbackFeatures: FeatureToggleModel[] = [
    { key: 'RatesAndOffersMenu', enabled: true },
    { key: 'DirfMenu', enabled: true },
    { key: 'QuickSearchMenu', enabled: true },
    { key: 'UnificationPassword', enabled: true }
  ];

  constructor() { }

  getFeatures(): Observable<FeatureToggleModel[]> {
    return of(this.fallbackFeatures);
  }

}
