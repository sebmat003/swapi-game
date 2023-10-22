import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GameHttpService } from "../services/game-http.service";
import * as VehicleInfoActions from '../actions/game.actions';
import { catchError, exhaustMap, forkJoin, map, of, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "../reducers/game.reducers";
import { selectAllPeopleIds } from "../selectors/game.selectors";

@Injectable()
export class GameEffects {
  getRandomPeople$ = createEffect(() => this.actions$.pipe(
    ofType(VehicleInfoActions.getRandomPeople),
    withLatestFrom(this.store.select(selectAllPeopleIds)),
    exhaustMap(([_, ids]) =>
      forkJoin(new Array(2).fill(undefined).map(() => this.gameHttpService.getPerson(this.getRandomId(ids)))).pipe(
        map((response) => VehicleInfoActions.getRandomPeopleSuccess({randomPeople: response.map(res => res.result.properties)})),
        catchError((error: string) => of(VehicleInfoActions.getRandomPeopleFailure({error})))
      )
    )));

  getAllPeople$ = createEffect(() => this.actions$.pipe(ofType(VehicleInfoActions.getAllPeople), exhaustMap(() =>
    this.gameHttpService.getAllPeople().pipe(
      map(({results: allPeople}) => VehicleInfoActions.getAllPeopleSuccess({allPeople})),
      catchError((error: string) => of(VehicleInfoActions.getAllPeopleFailure({error})))
    )
  )));

  private getRandomId(ids: number[]): number {
    return ids[Math.floor(Math.random() * (ids.length - 1))];
  }

  constructor(private actions$: Actions, private gameHttpService: GameHttpService, private store: Store<State>) {
  }
}
