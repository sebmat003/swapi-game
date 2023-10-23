import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { GameCounterComponent } from "./game-counter.component";
import { MatSelectModule } from "@angular/material/select";
import { BehaviorSubject } from "rxjs";

describe('GameCounterComponent', () => {
  let spectator: Spectator<GameCounterComponent>;
  let roundWinner$ = new BehaviorSubject<number>(0);
  const createComponent = createComponentFactory({
    component: GameCounterComponent,
    imports: [MatSelectModule],
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();

    spectator.setInput('roundWinner$', roundWinner$)
  })

  it('Should match snapshot', () => {
    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();
  });

  it('Should add point to second player', () => {
    roundWinner$.next(1);

    expect(spectator.component.counter).toEqual([1, 1]);
  })
});
