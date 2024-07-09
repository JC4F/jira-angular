import { SvgIconComponent } from '@/shared/components/svg-icon/svg-icon.component';
import { IssueUtil } from '@/shared/utils/issue';
import { IssueSchema } from '@/types';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'issue-result',
  templateUrl: './issue-result.component.html',
  imports: [SvgIconComponent],
})
export class IssueResultComponent {
  @Input() issue: IssueSchema;

  get issueTypeIcon() {
    return IssueUtil.getIssueTypeIcon(this.issue?.iss_type);
  }
}
