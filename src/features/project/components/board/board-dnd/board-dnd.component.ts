import { issueByStatusSorted } from '@/stores/project/project.selector';
import { RootState } from '@/stores/root-store';
import { IssueStatus } from '@/types';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { BoardDndListComponent } from '../board-dnd-list/board-dnd-list.component';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'board-dnd',
  templateUrl: './board-dnd.component.html',
  imports: [CommonModule, DragDropModule, BoardDndListComponent],
})
export class BoardDndComponent {
  issueStatuses: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE,
  ];

  constructor(public _store: Store<RootState>) {}

  currentUserId = this._store.select(state => state.user.id);

  getIssues(status: IssueStatus) {
    return this._store.select(issueByStatusSorted(status));
  }
}
