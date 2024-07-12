import { HlmInputDirective } from '@/shared/components/ui-input-helm/src';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { IssueSchema } from '@/types';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'issue-title',
  templateUrl: './issue-title.component.html',
  imports: [ReactiveFormsModule, HlmInputDirective, TextFieldModule],
})
export class IssueTitleComponent implements OnChanges {
  @Input() issue: IssueSchema;
  titleControl: FormControl;

  constructor(private _store: Store<RootState>) {}

  ngOnChanges(changes: SimpleChanges): void {
    const issueChange = changes['issue'];
    if (issueChange.currentValue !== issueChange.previousValue) {
      this.titleControl = new FormControl(this.issue.title);
    }
  }

  onBlur() {
    this._store.dispatch(
      ProjectActions.updateIssues({
        ...this.issue,
        title: this.titleControl.value,
      })
    );
  }
}
