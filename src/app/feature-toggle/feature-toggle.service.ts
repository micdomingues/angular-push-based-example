import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { finalize, map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { FeatureToggleRepository } from './feature-toggle.repository';
import { environment } from 'src/environments/environment';

export interface FeatureToggleState {
  features: Map<string, boolean>;
  loaded: boolean;
}

@Injectable({ providedIn: 'root' })
export class FeatureToggleService {

  private state = this.initialState();
  private store = new BehaviorSubject<FeatureToggleState>(this.state);
  private state$ = this.store.asObservable();

  // Cria streams de cada variável que pode ser utilizada a partir do estado inicial
  features$ = this.state$.pipe(map(state => state.features), distinctUntilChanged());
  loaded$ = this.state$.pipe(map(state => state.loaded));

  // Podemos criar fluxos mais simples de acordo com outros estados
  // authenticated$ = this.userFacade.pipe(map(state => state.authenticated))
  authenticated$ = of(true);
  // user$ = this.userFacade.pipe(map(state => state.user))
  user$ = of('zé do posto');

  vm$: Observable<FeatureToggleState> = combineLatest(this.features$, this.loaded$).pipe(
    map(([features, loaded]) => {
      return { features, loaded };
    })
  );

  constructor(private featureToggleRepository: FeatureToggleRepository) {

    // Caso queira se basear em uma regra de negocio
    // combineLatest(this.authenticated$, this.user$).pipe(
    //   tap(() => this.updateState({ ...this.state, loaded: false })),
    //   switchMap(([authenticated, user]) => {
    //     return this.loadFeatures(authenticated, user);
    //   })
    // ).subscribe(features => {
    //   this.updateState({ ...this.state, features, loaded: true });
    // });


    // Caso não seja baseado em outras streams
    this.loadFeatures(null, null).pipe(
      tap(() => this.updateState({ ...this.state, loaded: false })))
      .subscribe(features => {
        this.updateState({ ...this.state, features, loaded: true });
      });

  }

  turnOn(key: string): void {
    if (!environment.production) {
      const features = this.state.features.set(key, true);
      this.updateState({ ...this.state, features });
    }
  }

  turnOff(key: string): void {
    if (!environment.production) {
      const features = this.state.features.set(key, false);
      this.updateState({ ...this.state, features });
    }
  }

  private loadFeatures(authenticated: boolean, user: string): Observable<Map<string, boolean>> {
    return this.featureToggleRepository.getFeatures().pipe(
      map((featuresArray: Array<any>) => {
        return new Map(featuresArray.map(i => [i.key, i.enabled]));
      }));

  }

  private updateState(state: FeatureToggleState): void {
    this.store.next(this.state = state);
  }

  private initialState(): FeatureToggleState {
    return {
      features: new Map<string, boolean>(),
      loaded: false
    };
  }

}
