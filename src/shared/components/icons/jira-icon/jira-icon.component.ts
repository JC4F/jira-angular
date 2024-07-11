import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'jira-icon',
  templateUrl: './jira-icon.component.html',
  imports: [],
})
export class JiraIconComponent {
  @Input() class = '';
}
