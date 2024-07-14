import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';
import { HlmDialogService } from '@/shared/components/ui-dialog-helm/src';
import { HlmIconComponent } from '@/shared/components/ui-icon-helm/src';
import { HlmSpinnerComponent } from '@/shared/components/ui-spinner-helm/src';
import { RootState } from '@/stores/root-store';
import { DeleteIssueModel, IssueSchema } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  lucideExpand,
  lucideMegaphone,
  lucideTrash,
  lucideX,
} from '@ng-icons/lucide';
import { Store } from '@ngrx/store';
import { IssueAssigneesComponent } from '../issue-assignees/issue-assignees.component';
import { IssueCommentsComponent } from '../issue-comments/issue-comments.component';
import { IssueDeleteModalComponent } from '../issue-delete-modal/issue-delete-modal.component';
import { IssueDescriptionComponent } from '../issue-description/issue-description.component';
import { IssuePriorityComponent } from '../issue-priority/issue-priority.component';
import { IssueReporterComponent } from '../issue-reporter/issue-reporter.component';
import { IssueStatusComponent } from '../issue-status/issue-status.component';
import { IssueTitleComponent } from '../issue-title/issue-title.component';
import { IssueTypeComponent } from '../issue-type/issue-type.component';

@Component({
  standalone: true,
  selector: 'issue-detail',
  templateUrl: './issue-detail.component.html',
  imports: [
    HlmButtonDirective,
    CommonModule,
    HlmIconComponent,
    IssueDescriptionComponent,
    IssueCommentsComponent,
    IssueAssigneesComponent,
    HlmSpinnerComponent,
    IssueTitleComponent,
    IssueStatusComponent,
    IssueReporterComponent,
    IssuePriorityComponent,
    IssueTypeComponent,
  ],
  providers: [
    provideIcons({ lucideTrash, lucideMegaphone, lucideExpand, lucideX }),
  ],
})
export class IssueDetailComponent {
  @Input() isModal: boolean;
  @Input() issue: IssueSchema;
  @Input() isShowFullScreenButton: boolean;
  @Input() isShowCloseButton: boolean;
  @Output() onClosed = new EventEmitter();
  @Output() onOpenIssue = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<DeleteIssueModel>();

  constructor(
    public _store: Store<RootState>,
    private _hlmDialogService: HlmDialogService
  ) {}

  users = this._store.select(state => state.project.users);

  openDeleteIssueModal() {
    this._hlmDialogService.open(IssueDeleteModalComponent, {
      context: {
        issueId: this.issue.id,
        onDelete: this.onDelete,
      },
    });
  }

  closeModal() {
    this.onClosed.emit();
  }

  openIssuePage() {
    this.onOpenIssue.emit(this.issue.id);
  }
}
