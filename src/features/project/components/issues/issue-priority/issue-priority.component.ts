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
import { IssueUtil } from '@/shared/utils/issue';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { IssuePriority, IssuePriorityIcon, IssueSchema } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';

@Component({
  standalone: true,
  selector: 'issue-priority',
  templateUrl: './issue-priority.component.html',
  imports: [
    HlmButtonDirective,
    CommonModule,
    SvgIconComponent,
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
export class IssuePriorityComponent implements OnInit, OnChanges {
  @Input() issue: IssueSchema;

  selectedPriority: IssuePriority;
  get selectedPriorityIcon() {
    return IssueUtil.getIssuePriorityIcon(this.selectedPriority);
  }

  priorities: IssuePriorityIcon[];

  constructor(private _store: Store<RootState>) {}

  ngOnInit() {
    this.priorities = ProjectConst.PrioritiesWithIcon;
  }

  ngOnChanges(): void {
    this.selectedPriority = this.issue?.priority;
  }

  isPrioritySelected(priority: IssuePriority) {
    return priority === this.selectedPriority;
  }

  updateIssue(priority: IssuePriority) {
    this.selectedPriority = priority;
    this._store.dispatch(
      ProjectActions.updateIssues({
        ...this.issue,
        priority: this.selectedPriority,
      })
    );
  }
}
