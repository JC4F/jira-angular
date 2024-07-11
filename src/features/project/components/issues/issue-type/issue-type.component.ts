import { ProjectConst } from '@/constants';
import { SvgIconComponent } from '@/shared/components/svg-icon/svg-icon.component';
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
import { IssueUtil } from '@/shared/utils/issue';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { IssueSchema, IssueType, IssueTypeWithIcon } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';

@Component({
  standalone: true,
  selector: 'issue-type',
  templateUrl: './issue-type.component.html',
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
    SvgIconComponent,
  ],
})
export class IssueTypeComponent {
  @Input() issue: IssueSchema;

  get selectedIssueTypeIcon() {
    return IssueUtil.getIssueTypeIcon(this.issue.iss_type);
  }

  issueTypes: IssueTypeWithIcon[];

  constructor(private _store: Store<RootState>) {
    this.issueTypes = ProjectConst.IssueTypesWithIcon;
  }

  updateIssue(issueType: IssueType) {
    this._store.dispatch(
      ProjectActions.updateIssues({
        ...this.issue,
        iss_type: issueType,
      })
    );
  }

  isTypeSelected(type: IssueType) {
    return this.issue.iss_type === type;
  }
}
