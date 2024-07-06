import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HlmButtonDirective],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'jira-clone';
}
