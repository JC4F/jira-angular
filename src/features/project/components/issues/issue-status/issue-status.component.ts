import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '@/shared/components/ui-menu-helm/src';
import { lastIssuePosition } from '@/stores/project/project.selector';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { IssueSchema, IssueStatus, IssueStatusDisplay } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'issue-status',
  templateUrl: './issue-status.component.html',
  imports: [
    HlmButtonDirective,
    CommonModule,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmSubMenuComponent,
    HlmMenuItemDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    HlmMenuItemIconDirective,
    HlmMenuGroupComponent,
  ],
})
export class IssueStatusComponent implements OnInit {
  @Input() issue: IssueSchema;

  IssueStatusDisplay = IssueStatusDisplay;

  variants = {
    [IssueStatus.BACKLOG]: 'btn-secondary',
    [IssueStatus.SELECTED]: 'btn-secondary',
    [IssueStatus.IN_PROGRESS]: 'btn-primary',
    [IssueStatus.DONE]: 'btn-success',
  };

  issueStatuses: IssueStatusValueTitle[];

  constructor(private _store: Store<RootState>) {}

  ngOnInit(): void {
    this.issueStatuses = [
      new IssueStatusValueTitle(IssueStatus.BACKLOG),
      new IssueStatusValueTitle(IssueStatus.SELECTED),
      new IssueStatusValueTitle(IssueStatus.IN_PROGRESS),
      new IssueStatusValueTitle(IssueStatus.DONE),
    ];
  }

  updateIssue(status: IssueStatus) {
    this._store
      .select(lastIssuePosition(status))
      .pipe(map(position => position + 1))
      .subscribe(newPosition => {
        this._store.dispatch(
          ProjectActions.updateIssues({
            ...this.issue,
            status,
            listPosition: newPosition,
          })
        );
      });
  }

  isStatusSelected(status: IssueStatus) {
    return this.issue.status === status;
  }
}

class IssueStatusValueTitle {
  value: IssueStatus;
  label: string;
  constructor(issueStatus: IssueStatus) {
    this.value = issueStatus;
    this.label = IssueStatusDisplay[issueStatus];
  }
}
