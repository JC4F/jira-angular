import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { DeleteIssueModel, IssueSchema } from '@/types';
import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BrnDialogRef } from '@spartan-ng/ui-dialog-brain';
import { Observable } from 'rxjs';
import { IssueDetailComponent } from '../issue-detail/issue-detail.component';

@Component({
  standalone: true,
  selector: 'issue-modal',
  templateUrl: './issue-modal.component.html',
  imports: [IssueDetailComponent, AsyncPipe],
})
export class IssueModalComponent {
  @Input() issue$: Observable<IssueSchema>;

  constructor(
    private _dialogRef: BrnDialogRef,
    private _router: Router,
    private _store: Store<RootState>
  ) {}

  closeModal() {
    this._dialogRef.close();
  }

  openIssuePage(issueId: string) {
    this.closeModal();
    this._router.navigate(['project', 'issue', issueId]);
  }

  deleteIssue({ issueId, _dialogRef }: DeleteIssueModel) {
    this._store.dispatch(ProjectActions.deleteIssues({ issueId }));
    _dialogRef.close();
    this.closeModal();
  }
}
