import { SvgIconComponent } from '@/shared/components/svg-icon/svg-icon.component';
import {
  HlmIconComponent,
  provideIcons,
} from '@/shared/components/ui-icon-helm/src';
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
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { lucidePlus } from '@ng-icons/lucide';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';

@Component({
  standalone: true,
  selector: 'issue-assignees',
  templateUrl: './issue-assignees.component.html',
  imports: [
    SvgIconComponent,
    UserComponent,
    CommonModule,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuShortcutComponent,
    HlmSubMenuComponent,
    BrnMenuTriggerDirective,
    HlmIconComponent,
  ],
  providers: [provideIcons({ lucidePlus })],
})
@UntilDestroy()
export class IssueAssigneesComponent implements OnInit, OnChanges {
  @Input() issue: IssueSchema;
  @Input() users: UserSchema[];
  assignees: UserSchema[];

  constructor(private _store: Store<RootState>) {}

  ngOnInit(): void {
    this.assignees = this.issue.userIds.map(userId =>
      this.users.find(x => x.id === userId)
    ) as UserSchema[];
  }

  ngOnChanges(changes: SimpleChanges) {
    const issueChange = changes['issue'];
    if (this.users && issueChange.currentValue !== issueChange.previousValue) {
      this.assignees = this.issue.userIds.map(userId =>
        this.users.find(x => x.id === userId)
      ) as UserSchema[];
    }
  }

  removeUser(userId: string) {
    const newUserIds = this.issue.userIds.filter(x => x !== userId);
    this._store.dispatch(
      ProjectActions.updateIssues({
        ...this.issue,
        userIds: newUserIds,
      })
    );
  }

  addUserToIssue(user: UserSchema) {
    this._store.dispatch(
      ProjectActions.updateIssues({
        ...this.issue,
        userIds: [...this.issue.userIds, user.id],
      })
    );
  }

  isUserSelected(user: UserSchema): boolean {
    return this.issue.userIds.includes(user.id);
  }
}
