import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOptionsComponent {
  @Input() personProperty!: FormControl;
}
