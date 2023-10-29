import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameHttpService } from '../services/game-http.service';
import * as VehicleInfoActions from '../actions/game.actions';
import {
  catchError,
  exhaustMap,
  forkJoin,
  map,
  of,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../reducers/game.reducers';
import { selectNumberOfPeople } from '../selectors/game.selectors';
import { getRandomNumber } from '../../../../shared/functions/random-number/random-number.function';

@Injectable()
export class GameEffects {
  getRandomPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleInfoActions.getRandomPeople),
      withLatestFrom(this.store.select(selectNumberOfPeople)),
      exhaustMap(([, numberOfPeople]) =>
        forkJoin(
          new Array(2)
            .fill(undefined)
            .map(() =>
              this.gameHttpService.getPerson(getRandomNumber(numberOfPeople)),
            ),
        ).pipe(
          map((response) =>
            VehicleInfoActions.getRandomPeopleSuccess({
              randomPeople: response.map((res) => res.result.properties),
            }),
          ),
          catchError((error: string) =>
            of(VehicleInfoActions.getRandomPeopleFailure({ error })),
          ),
        ),
      ),
    ),
  );

  getNumberOfPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleInfoActions.getNumberOfPeople),
      exhaustMap(() =>
        this.gameHttpService.getNumberOfPeople().pipe(
          map((numberOfPeople) =>
            VehicleInfoActions.getNumberOfPeopleSuccess({ numberOfPeople }),
          ),
          catchError((error: string) =>
            of(VehicleInfoActions.getNumberOfPeopleFailure({ error })),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private gameHttpService: GameHttpService,
    private store: Store<State>,
  ) {}
}
