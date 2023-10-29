import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComparableProperty, Person } from '../../models/person.models';
import { filter, Observable, Subject, tap } from 'rxjs';
import { State } from '../../store/reducers/game.reducers';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectLoading,
  selectPeople,
} from '../../store/selectors/game.selectors';
import {
  getNumberOfPeople,
  getRandomPeople,
} from '../../store/actions/game.actions';
import { parseNumber } from '../../../../shared/functions/parse-number/parse-number.function';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameViewComponent implements OnInit {
  currentPeople$!: Observable<Person[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string>;
  winnerIndex$ = new Subject<number>();
  form = new FormGroup({
    personProperty: new FormControl(null, {
      validators: [Validators.required],
    }),
  });
  winner!: Person;

  constructor(
    private store: Store<State>,
    private cdr: ChangeDetectorRef,
  ) {}

  get personPropertyControl(): FormControl {
    return <FormControl>this.form.get('personProperty');
  }

  ngOnInit(): void {
    this.store.dispatch(getNumberOfPeople());
    this.currentPeople$ = this.store.select(selectPeople).pipe(
      filter(Boolean),
      tap((currentPeople) => {
        const property = this.personPropertyControl.value as ComparableProperty;
        if (currentPeople[0][property] != currentPeople[1][property]) {
          this.winner = [...currentPeople].sort((p1, p2) =>
            parseNumber(p1[property]) > parseNumber(p2[property]) ? -1 : 1,
          )[0];
          this.winnerIndex$.next(
            currentPeople.findIndex((p) => p.name === this.winner.name),
          );
          this.cdr.detectChanges();
        }
      }),
    );
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  startGame(): void {
    this.store.dispatch(getRandomPeople());
  }
}
