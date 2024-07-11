import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'x-icon',
  templateUrl: './x-icon.component.html',
  imports: [],
})
export class XIconComponent {
  @Input() class = '';
}
