import { BreadcrumbsComponent } from '@/shared/components/breadcrumbs/breadcrumbs.component';
import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';
import { Component } from '@angular/core';
import { BoardDndComponent } from '../../components/board/board-dnd/board-dnd.component';
import { BoardFilterComponent } from '../../components/board/board-filter/board-filter.component';

@Component({
  standalone: true,
  selector: 'board',
  templateUrl: './board.component.html',
  imports: [
    BreadcrumbsComponent,
    HlmButtonDirective,
    BoardFilterComponent,
    BoardDndComponent,
  ],
})
export class BoardComponent {
  breadcrumbs: string[] = ['Projects', 'Angular Jira Clone', 'Kanban Board'];
}
