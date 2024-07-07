import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';

@Component({
  selector: 'home-root',
  standalone: true,
  imports: [RouterOutlet, HlmButtonDirective],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'jira-clone';
}
