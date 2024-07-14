import { EventEmitter } from '@angular/core';
import { BrnDialogRef } from '@spartan-ng/ui-dialog-brain';

export type DeleteIssueModel = {
  issueId: string;
  _dialogRef: BrnDialogRef;
};

export type DeleteIssueContext = {
  issueId: string;
  onDelete: EventEmitter<DeleteIssueModel>;
};
