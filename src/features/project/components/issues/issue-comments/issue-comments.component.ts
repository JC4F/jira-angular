import { IssueSchema } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IssueCommentComponent } from '../issue-comment/issue-comment.component';

@Component({
  standalone: true,
  selector: 'issue-comments',
  templateUrl: './issue-comments.component.html',
  imports: [IssueCommentComponent, CommonModule],
})
export class IssueCommentsComponent {
  @Input() issue: IssueSchema;
}
