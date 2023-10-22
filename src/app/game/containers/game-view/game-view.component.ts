import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ComparableProperty, Person } from "../../game/person.models";
import { filter, Observable, Subject, tap } from "rxjs";
import { State } from "../../store/reducers/game.reducers";
import { Store } from "@ngrx/store";
import { selectLoading, selectPeople } from "../../store/selectors/game.selectors";
import { getAllPeople, getRandomPeople } from "../../store/actions/game.actions";

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameViewComponent implements OnInit {
  currentPeople$!: Observable<Person[]>;
  loading$!: Observable<boolean>;
  winnerIndex$ = new Subject<number>();
  form = new FormGroup({
    personProperty: new FormControl(null, {validators: [Validators.required]})
  });
  winner!: Person;

  constructor(private store: Store<State>, private cdr: ChangeDetectorRef) {
  }

  get personPropertyControl(): FormControl {
    return <FormControl>this.form.get('personProperty');
  }

  ngOnInit() {
    this.store.dispatch(getAllPeople());
    this.currentPeople$ = this.store.select(selectPeople).pipe(filter(Boolean), tap((currentPeople) => {
      const property = this.personPropertyControl.value as ComparableProperty;
      if (currentPeople[0][property] != currentPeople[1][property]) {
        this.winner = [...currentPeople].sort((p1, p2) => this.parseNumber(p1[property]) > this.parseNumber(p2[property]) ? -1 : 1)[0];
        this.winnerIndex$.next(currentPeople.findIndex(p => p.name === this.winner.name));
        this.cdr.detectChanges();
      }
    }));
    this.loading$ = this.store.select(selectLoading);
  }

  startGame() {
    this.store.dispatch(getRandomPeople());
  }

  private parseNumber(number: string) {
    const parsedFloat = Math.floor(Number.parseFloat(number));
    return Number.isNaN(parsedFloat) ? 0 : parsedFloat;
  }
}
