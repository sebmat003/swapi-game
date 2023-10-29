import { cold, hot } from 'jest-marbles';
import { Observable, of } from 'rxjs';
import { GameEffects } from './game.effects';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { createTestObjects } from '../../testing/game-testing.data';
import * as GameActions from '../actions/game.actions';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { GameHttpService } from '../services/game-http.service';
import { HttpClientModule } from '@angular/common/http';
import { initialState } from '../reducers/game.reducers';
import { selectNumberOfPeople } from '../selectors/game.selectors';

const { numberOfPeople, randomPeople, error } = createTestObjects();

const mockGameHttpService = {
  getNumberOfPeople: () => {},
  getPerson: () => {},
};

describe('Game Effects', () => {
  let spectator: SpectatorService<GameEffects>;
  let effects: GameEffects;
  let actions$: Observable<Actions>;
  const createService = createServiceFactory({
    service: GameEffects,
    imports: [HttpClientModule],
    providers: [
      provideMockStore({
        initialState,
        selectors: [
          {
            selector: selectNumberOfPeople,
            value: numberOfPeople,
          },
        ],
      }),
      provideMockActions(() => actions$),
      {
        provide: GameHttpService,
        useValue: mockGameHttpService,
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();

    effects = spectator.service;
  });

  describe('getNumberOfPeople$', () => {
    it('- should gets all people with basic data from API', () => {
      mockGameHttpService.getNumberOfPeople = () => of(numberOfPeople);
      const action = GameActions.getNumberOfPeople();
      const response = GameActions.getNumberOfPeopleSuccess({ numberOfPeople });

      actions$ = hot('-a', { a: action });
      const expected = cold('-r', { r: response });

      expect(effects.getNumberOfPeople$).toBeObservable(expected);
    });

    it('- should returns failure action when API returns error', () => {
      const action = GameActions.getNumberOfPeople();
      const response = GameActions.getNumberOfPeopleFailure({ error });
      const errorResponse = cold('-#', {}, error);
      mockGameHttpService.getNumberOfPeople = () => errorResponse;

      actions$ = hot('-a', { a: action });
      const expected = cold('--r', { r: response });

      expect(effects.getNumberOfPeople$).toBeObservable(expected);
    });
  });

  describe('getRandomPeople$', () => {
    it('- should gets 2 random people from API', () => {
      jest.spyOn(globalThis.Math, 'random').mockReturnValue(0);
      mockGameHttpService.getPerson = () =>
        of({ result: { properties: randomPeople[0] } });
      const action = GameActions.getRandomPeople();
      const response = GameActions.getRandomPeopleSuccess({
        randomPeople: [randomPeople[0], randomPeople[0]],
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-r', { r: response });

      expect(effects.getRandomPeople$).toBeObservable(expected);
    });

    it('- should returns failure action when API returns error', () => {
      const action = GameActions.getRandomPeople();
      const response = GameActions.getRandomPeopleFailure({ error });
      const errorResponse = cold('-#', {}, error);
      mockGameHttpService.getPerson = () => errorResponse;

      actions$ = hot('-a', { a: action });
      const expected = cold('--r', { r: response });

      expect(effects.getRandomPeople$).toBeObservable(expected);
    });
  });
});
