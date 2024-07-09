import { ProjectConst } from '@/constants';
import { SvgIconComponent } from '@/shared/components/svg-icon/svg-icon.component';
import { HlmSelectImports } from '@/shared/components/ui-select-helm/src';
import { IssueUtil } from '@/shared/utils/issue';
import { IssueType, IssueTypeWithIcon } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';

@Component({
  standalone: true,
  selector: 'issue-type-select',
  templateUrl: './issue-type-select.component.html',
  imports: [BrnSelectImports, HlmSelectImports, SvgIconComponent, CommonModule],
})
export class IssueTypeSelectComponent {
  @Input() control!: FormControl;
  issueTypes: IssueTypeWithIcon[];

  constructor() {
    this.issueTypes = ProjectConst.IssueTypesWithIcon;
  }

  getIssueTypeIcon(issueType: IssueType) {
    return IssueUtil.getIssueTypeIcon(issueType);
  }
}
