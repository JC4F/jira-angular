import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';
import { DeleteIssueModel } from '@/types';
import { Component, EventEmitter } from '@angular/core';
import { BrnDialogRef } from '@spartan-ng/ui-dialog-brain';

@Component({
  standalone: true,
  selector: 'issue-delete-modal',
  templateUrl: './issue-delete-modal.component.html',
  imports: [HlmButtonDirective],
})
export class IssueDeleteModalComponent {
  issueId: string;

  onDelete = new EventEmitter<DeleteIssueModel>();

  constructor(private _dialogRef: BrnDialogRef) {}

  deleteIssue() {
    this.onDelete.emit({ issueId: this.issueId, _dialogRef: this._dialogRef });
  }

  closeModal() {
    this._dialogRef.close();
  }
}
