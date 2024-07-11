import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

import { IssueUtil } from '@/shared/utils/issue';
import { FilterState } from '@/stores/filter/filters.reducers';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { IssueSchema, IssueStatus, IssueStatusDisplay } from '@/types';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import * as dateFns from 'date-fns';
import { Observable, combineLatest } from 'rxjs';
import { IssueCardComponent } from '../../issues/issue-card/issue-card.component';

@Component({
  standalone: true,
  selector: '[board-dnd-list]',
  templateUrl: './board-dnd-list.component.html',
  imports: [DragDropModule, IssueCardComponent, CommonModule],
})
@UntilDestroy()
export class BoardDndListComponent implements OnInit {
  @Input() status: IssueStatus;
  @Input() currentUserId: string;
  @Input() issues$: Observable<IssueSchema[]>;

  IssueStatusDisplay = IssueStatusDisplay;
  issues: IssueSchema[] = [];

  get issuesCount(): number {
    return this.issues.length;
  }

  constructor(private _store: Store<RootState>) {}

  ngOnInit(): void {
    combineLatest([this.issues$, this._store.select(state => state.filter)])
      .pipe(untilDestroyed(this))
      .subscribe(([issues, filter]) => {
        this.issues = this.filterIssues(issues, filter);
      });
  }

  drop(event: CdkDragDrop<IssueSchema[]>) {
    const newIssue: IssueSchema = { ...event.item.data };
    const newIssues = [...event.container.data];
    if (event.previousContainer === event.container) {
      moveItemInArray(newIssues, event.previousIndex, event.currentIndex);
      this.updateListPosition(newIssues);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        newIssues,
        event.previousIndex,
        event.currentIndex
      );
      this.updateListPosition(newIssues);
      newIssue.status = event.container.id as IssueStatus;
      this._store.dispatch(ProjectActions.updateIssues(newIssue));
    }
  }

  filterIssues(issues: IssueSchema[], filter: FilterState): IssueSchema[] {
    const { onlyMyIssue, ignoreResolved, searchTerm, userIds } = filter;
    return issues.filter(issue => {
      const isMatchTerm = searchTerm
        ? IssueUtil.searchString(issue.title, searchTerm)
        : true;

      const isIncludeUsers = userIds.length
        ? issue.userIds.some(userId => userIds.includes(userId))
        : true;

      const isMyIssue = onlyMyIssue
        ? this.currentUserId && issue.userIds.includes(this.currentUserId)
        : true;

      const isIgnoreResolved = ignoreResolved
        ? issue.status !== IssueStatus.DONE
        : true;

      return isMatchTerm && isIncludeUsers && isMyIssue && isIgnoreResolved;
    });
  }

  isDateWithinThreeDaysFromNow(date: string) {
    const now = new Date();
    const inputDate = new Date(date);
    return dateFns.isAfter(inputDate, dateFns.subDays(now, 3));
  }

  private updateListPosition(newList: IssueSchema[]) {
    newList.forEach((issue, idx) => {
      const newIssueWithNewPosition = { ...issue, listPosition: idx + 1 };
      this._store.dispatch(
        ProjectActions.updateIssues(newIssueWithNewPosition)
      );
    });
  }
}
