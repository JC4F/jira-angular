import { BreadcrumbsComponent } from '@/shared/components/breadcrumbs/breadcrumbs.component';
import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'board',
  templateUrl: './board.component.html',
  imports: [BreadcrumbsComponent, HlmButtonDirective],
})
export class BoardComponent {
  breadcrumbs: string[] = ['Projects', 'Angular Jira Clone', 'Kanban Board'];
}
