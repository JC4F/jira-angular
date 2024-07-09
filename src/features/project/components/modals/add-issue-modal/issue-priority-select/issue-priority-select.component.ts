import { ProjectConst } from '@/constants';
import { SvgIconComponent } from '@/shared/components/svg-icon/svg-icon.component';
import { HlmSelectImports } from '@/shared/components/ui-select-helm/src';
import { IssueUtil } from '@/shared/utils/issue';
import { IssuePriority, IssuePriorityIcon } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';

@Component({
  standalone: true,
  selector: 'issue-priority-select',
  templateUrl: './issue-priority-select.component.html',
  imports: [BrnSelectImports, HlmSelectImports, SvgIconComponent, CommonModule],
})
export class IssuePrioritySelectComponent {
  @Input() control!: FormControl;
  priorities: IssuePriorityIcon[];

  constructor() {
    this.priorities = ProjectConst.PrioritiesWithIcon;
  }

  getPriorityIcon(priority: IssuePriority) {
    return IssueUtil.getIssuePriorityIcon(priority);
  }
}
