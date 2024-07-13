import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'github-icon',
  templateUrl: './github-icon.component.html',
  imports: [],
})
export class GithubIconComponent {
  @Input() class = '';
}
