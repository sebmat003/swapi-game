import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let spectator: Spectator<ErrorMessageComponent>;
  const createComponent = createComponentFactory({
    component: ErrorMessageComponent,
    detectChanges: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('Should match snapshot', () => {
    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();
  });
});
