import { quillConfiguration } from '@/constants';
import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';
import {
  HlmIconComponent,
  provideIcons,
} from '@/shared/components/ui-icon-helm/src';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { IssueSchema } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { lucidePencil } from '@ng-icons/lucide';
import { Store } from '@ngrx/store';
import { QuillModule } from 'ngx-quill';

@Component({
  standalone: true,
  selector: 'issue-description',
  templateUrl: './issue-description.component.html',
  imports: [
    QuillModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmIconComponent,
    CommonModule,
  ],
  providers: [provideIcons({ lucidePencil })],
})
export class IssueDescriptionComponent implements OnChanges {
  @Input() issue: IssueSchema;
  descriptionControl: FormControl;
  editorOptions = quillConfiguration;
  isEditing: boolean;
  isWorking: boolean;

  constructor(private _store: Store<RootState>) {}

  ngOnChanges(changes: SimpleChanges): void {
    const issueChange = changes['issue'];
    if (issueChange.currentValue !== issueChange.previousValue) {
      this.descriptionControl = new FormControl(this.issue.description);
    }
  }

  setEditMode(mode: boolean) {
    this.isEditing = mode;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCreated(editor: any) {
    if (editor && editor.focus) {
      editor.focus();
    }
  }

  save() {
    this._store.dispatch(
      ProjectActions.updateIssues({
        ...this.issue,
        description: this.descriptionControl.value,
      })
    );
    this.setEditMode(false);
  }

  cancel() {
    this.descriptionControl.patchValue(this.issue.description);
    this.setEditMode(false);
  }
}
