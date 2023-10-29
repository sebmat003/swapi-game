import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { GameOptionsComponent } from './game-options.component';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../../../shared/shared.module';

describe('GameOptionsComponent', () => {
  let spectator: Spectator<GameOptionsComponent>;
  const createComponent = createComponentFactory({
    component: GameOptionsComponent,
    imports: [SharedModule],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();

    spectator.setInput('personProperty', new FormControl(null));
  });

  it('Should match snapshot', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('Should set attribute in ng-select', () => {
    spectator.detectChanges();

    spectator.click(
      spectator.debugElement.query(By.css('.mat-mdc-select-trigger'))
        .nativeElement,
    );
    spectator.detectChanges();
    spectator.click(
      spectator.debugElement.query(By.css('.mat-mdc-option')).nativeElement,
    );

    expect(spectator.component.personProperty.value).toEqual('mass');
  });
});
