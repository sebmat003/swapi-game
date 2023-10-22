import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @Input() url = 'assets/icons/icons.svg#';
  @Input({ required: true }) icon!: string;
  @Input() width = 48;
  @Input() height = 48;
}
