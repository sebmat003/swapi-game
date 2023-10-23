import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { IconComponent } from "./icon.component";

describe('IconComponent', () => {
  let spectator: Spectator<IconComponent>;
  const createComponent = createComponentFactory({
    component: IconComponent,
    detectChanges: false
  });

  beforeEach(() => spectator = createComponent())

  it('Should match snapshot', () => {
    spectator.setInput('icon', 'person');

    expect(spectator.fixture).toMatchSnapshot();
  });

  it('Should set provided width and height of icon', () => {
    const width = 100;
    const height = 100;

    spectator.setInput('width', width);
    spectator.setInput('height', height);

    expect(spectator.query('svg')?.getAttribute('width')).toEqual(width.toString());
    expect(spectator.query('svg')?.getAttribute('height')).toEqual(height.toString());
  })
});
