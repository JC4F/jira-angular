import { quillConfiguration } from '@/constants';
import { NoWhitespaceValidator } from '@/core/validators/no-whitespace.validator';
import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';
import { HlmDialogHeaderComponent } from '@/shared/components/ui-dialog-helm/src';
import { AutofocusDirective } from '@/shared/directives/autofocus.directive';
import { DateUtil } from '@/shared/utils/date';
import { IssueUtil } from '@/shared/utils/issue';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import {
  IssuePriority,
  IssueSchema,
  IssueStatus,
  IssueType,
  UserSchema,
} from '@/types';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { BrnDialogRef } from '@spartan-ng/ui-dialog-brain';
import { QuillModule } from 'ngx-quill';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IssueAssigneesSelectComponent } from './issue-assignees-select/issue-assignees-select.component';
import { IssuePrioritySelectComponent } from './issue-priority-select/issue-priority-select.component';
import { IssueReporterSelectComponent } from './issue-reporter-select/issue-reporter-select.component';
import { IssueTypeSelectComponent } from './issue-type-select/issue-type-select.component';

@Component({
  standalone: true,
  selector: 'add-issue-modal',
  templateUrl: './add-issue-modal.component.html',
  imports: [
    ReactiveFormsModule,
    IssueTypeSelectComponent,
    IssuePrioritySelectComponent,
    AutofocusDirective,
    QuillModule,
    IssueReporterSelectComponent,
    AsyncPipe,
    IssueAssigneesSelectComponent,
    HlmButtonDirective,
    HlmDialogHeaderComponent,
  ],
})
@UntilDestroy()
export class AddIssueModalComponent implements OnInit {
  reporterUsers$: Observable<UserSchema[]>;
  assignees$: Observable<UserSchema[]>;
  editorOptions = quillConfiguration;
  issueForm = this._fb.group({
    iss_type: [IssueType.TASK],
    priority: [IssuePriority.MEDIUM],
    title: ['', NoWhitespaceValidator()],
    description: [''],
    reporterId: [''],
    userIds: [[]],
  });

  get f() {
    return this.issueForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private readonly _dialogRef: BrnDialogRef,
    private _store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.reporterUsers$ = this._store
      .select(state => state.project.users)
      .pipe(
        untilDestroyed(this),
        tap(users => {
          const [user] = users;
          if (user) {
            this.f.reporterId.patchValue(user.id);
          }
        })
      );

    this.assignees$ = this._store.select(state => state.project.users);
  }

  submitForm() {
    if (this.issueForm.invalid) {
      return;
    }
    const now = DateUtil.getNow();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const issue: IssueSchema = {
      ...this.issueForm.getRawValue(),
      id: IssueUtil.getRandomId(),
      status: IssueStatus.BACKLOG,
      createdAt: now,
      updatedAt: now,
      listPosition: 0,
      estimate: 0,
      timeSpent: 0,
      timeRemaining: 0,
      comments: [],
      projectId: '',
    };

    this._store.dispatch(ProjectActions.updateIssues(issue));
    this.closeModal();
  }

  cancel() {
    this.closeModal();
  }

  closeModal() {
    this._dialogRef.close();
  }
}
