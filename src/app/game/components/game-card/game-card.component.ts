import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Person } from "../../game/person.models";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCardComponent {
  @Input() person!: Person;
  @Input() winner = false;
  @Input() index!: number;
}
