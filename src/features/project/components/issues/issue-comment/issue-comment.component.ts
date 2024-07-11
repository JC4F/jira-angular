import { AvatarComponent } from '@/shared/components/avatar/avatar.component';
import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';
import { HlmInputDirective } from '@/shared/components/ui-input-helm/src';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { CommentSchema, UserSchema } from '@/types';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'issue-comment',
  templateUrl: './issue-comment.component.html',
  imports: [
    AvatarComponent,
    CommonModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmInputDirective,
    TextFieldModule,
  ],
})
@UntilDestroy()
export class IssueCommentComponent implements OnInit {
  @Input() issueId: string;
  @Input() comment: CommentSchema;
  @Input() createMode: boolean;
  @ViewChild('commentBoxRef') commentBoxRef: ElementRef;
  commentControl: FormControl;
  user: UserSchema;
  isEditing: boolean;

  constructor(private _store: Store<RootState>) {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!this.createMode || this.isEditing) {
      return;
    }
    if (event.key === 'M') {
      this.commentBoxRef.nativeElement.focus();
      this.isEditing = true;
    }
  }

  ngOnInit(): void {
    this.commentControl = new FormControl('');
    this._store
      .select(state => state.user)
      .pipe(untilDestroyed(this))
      .subscribe(user => {
        this.user = user;
        if (this.createMode) {
          const now = new Date();
          this.comment = {
            id: `${now.getTime()}`,
            issueId: this.issueId,
            user: this.user,
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
            userId: this.user.id,
            body: '',
          };
        }
      });
  }

  setCommentEdit(mode: boolean) {
    this.isEditing = mode;
  }

  addComment() {
    const now = new Date();
    this._store.dispatch(
      ProjectActions.updateIssueComment({
        issueId: this.issueId,
        comment: {
          ...this.comment,
          id: `${now.getTime()}`,
          createdAt: now.toISOString(),
          updatedAt: now.toISOString(),
          body: this.commentControl.value,
        },
      })
    );
    this.cancelAddComment();
  }

  cancelAddComment() {
    this.commentControl.patchValue('');
    this.setCommentEdit(false);
  }
}
