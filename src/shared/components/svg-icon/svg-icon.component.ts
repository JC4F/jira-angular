import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'svg-icon',
  templateUrl: './svg-icon.component.html',
})
export class SvgIconComponent {
  @Input() name!: string;
  @Input() size = 16;
  @Input() fill = 'currentColor';
  window: Window = window;

  get iconUrl() {
    return `${this.window.location.href}#${this.name}`;
  }
}
