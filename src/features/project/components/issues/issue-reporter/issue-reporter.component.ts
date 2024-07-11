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
import { UserComponent } from '@/shared/components/user/user.component';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { IssueSchema, UserSchema } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';

@Component({
  standalone: true,
  selector: 'issue-reporter',
  templateUrl: './issue-reporter.component.html',
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
    UserComponent,
  ],
})
@UntilDestroy()
export class IssueReporterComponent implements OnChanges {
  @Input() issue: IssueSchema;
  @Input() users: UserSchema[];
  reporter: UserSchema;

  constructor(private _store: Store<RootState>) {}

  ngOnChanges(changes: SimpleChanges) {
    const issueChange = changes['issue'];
    if (this.users && issueChange.currentValue !== issueChange.previousValue) {
      this.reporter = this.users.find(
        x => x.id === this.issue.reporterId
      ) as UserSchema;
    }
  }

  isUserSelected(user: UserSchema) {
    return user.id === this.issue.reporterId;
  }

  updateIssue(user: UserSchema) {
    this._store.dispatch(
      ProjectActions.updateIssues({
        ...this.issue,
        reporterId: user.id,
      })
    );
  }
}
