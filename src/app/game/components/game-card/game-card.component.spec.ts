import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { GameCardComponent } from "./game-card.component";
import { createTestObjects } from "../../testing/game-testing.data";
import { SharedModule } from "../../../shared/shared.module";

const {person} = createTestObjects();

describe('GameCardComponent', () => {
  let spectator: Spectator<GameCardComponent>;
  const createComponent = createComponentFactory({
    component: GameCardComponent,
    imports: [SharedModule],
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();

    spectator.setInput('person', person);
    spectator.setInput('index', 0);
  });

  it('Should match snapshot', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('Should set border to green if winner', () => {
    spectator.setInput('winner', true);

    expect(spectator.query('.game-card')).toHaveClass('winner')
  });
});
