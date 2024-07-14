import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';
import { DeleteIssueContext } from '@/types';
import { Component } from '@angular/core';
import {
  BrnDialogRef,
  injectBrnDialogContext,
} from '@spartan-ng/ui-dialog-brain';

@Component({
  standalone: true,
  selector: 'issue-delete-modal',
  templateUrl: './issue-delete-modal.component.html',
  imports: [HlmButtonDirective],
})
export class IssueDeleteModalComponent {
  private readonly _dialogContext =
    injectBrnDialogContext<DeleteIssueContext>();
  issueId = this._dialogContext.issueId;
  onDelete = this._dialogContext.onDelete;

  constructor(private _dialogRef: BrnDialogRef) {}

  deleteIssue() {
    this.onDelete.emit({ issueId: this.issueId, _dialogRef: this._dialogRef });
  }

  closeModal() {
    this._dialogRef.close();
  }
}
