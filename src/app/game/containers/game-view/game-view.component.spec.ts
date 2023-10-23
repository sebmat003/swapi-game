import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { GameViewComponent } from "./game-view.component";
import { initialState, State } from "../../store/reducers/game.reducers";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ChangeDetectorRef } from "@angular/core";
import { selectLoading, selectPeople } from "../../store/selectors/game.selectors";
import { createTestObjects } from "../../testing/game-testing.data";
import { GameOptionsComponent } from "../../components/game-options/game-options.component";
import { GameCounterComponent } from "../../components/game-counter/game-counter.component";
import { GameCardComponent } from "../../components/game-card/game-card.component";
import { SharedModule } from "../../../shared/shared.module";
import { getRandomPeople } from "../../store/actions/game.actions";

const {randomPeople} = createTestObjects();

describe('GameViewComponent', () => {
  let spectator: Spectator<GameViewComponent>;
  let store: MockStore<State>;
  let cdr: ChangeDetectorRef;
  const createComponent = createComponentFactory({
    component: GameViewComponent,
    imports: [SharedModule],
    declarations: [GameOptionsComponent, GameCounterComponent, GameCardComponent],
    providers: [
      provideMockStore({
        initialState,
        selectors: [
          {
            selector: selectLoading,
            value: false
          },
          {
            selector: selectPeople,
            value: randomPeople
          }]
      }),
      ChangeDetectorRef
    ],
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();

    cdr = spectator.inject(ChangeDetectorRef);
    store = spectator.inject(MockStore);

    store.overrideSelector(selectPeople, randomPeople);
    store.overrideSelector(selectLoading, false);
  });

  describe('Should match snapshot', () => {
    it('- when full data is loaded', () => {
      spectator.detectChanges();

      expect(spectator.fixture).toMatchSnapshot();
    });

    it('- when data is loading', () => {
      store.overrideSelector(selectLoading, true);

      spectator.detectChanges();

      expect(spectator.fixture).toMatchSnapshot();
    });
  })

  it('Should add 1 point to first player', () => {
    store.overrideSelector(selectPeople, [
      randomPeople[0],
      {...randomPeople[1], mass: '15'}
    ]);

    spectator.component.personPropertyControl.setValue('mass');
    spectator.detectChanges();

    expect(spectator.component.winner.name).toEqual(randomPeople[0].name);
  });

  it('Should start game after clicking Play', () => {
    spectator.detectChanges();
    jest.spyOn(store, 'dispatch');

    spectator.component.personPropertyControl.setValue('height');
    spectator.detectChanges();
    spectator.click(spectator.query('.btn') as Element);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(getRandomPeople());
  })
});
