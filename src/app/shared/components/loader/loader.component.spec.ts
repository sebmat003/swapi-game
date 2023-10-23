import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { LoaderComponent } from "./loader.component";

describe('LoaderComponent', () => {
  let spectator: Spectator<LoaderComponent>;
  const createComponent = createComponentFactory({
    component: LoaderComponent,
    detectChanges: false
  });

  beforeEach(() => spectator = createComponent())

  it('Should match snapshot', () => {
    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();
  });
});
