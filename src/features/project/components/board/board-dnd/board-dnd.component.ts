import { RootState } from '@/stores/root-store';
import { IssueStatus } from '@/types';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'board-dnd',
  templateUrl: './board-dnd.component.html',
  imports: [CommonModule, DragDropModule],
})
export class BoardDndComponent {
  issueStatuses: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE,
  ];

  constructor(public _store: Store<RootState>) {}
}
