import { AvatarComponent } from '@/shared/components/avatar/avatar.component';
import { SvgIconComponent } from '@/shared/components/svg-icon/svg-icon.component';
import { HlmDialogService } from '@/shared/components/ui-dialog-helm/src';
import { IssueUtil } from '@/shared/utils/issue';
import { issueById } from '@/stores/project/project.selector';
import { RootState } from '@/stores/root-store';
import { IssuePriorityIcon, IssueSchema, UserSchema } from '@/types';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { IssueModalComponent } from '../issue-modal/issue-modal.component';

@Component({
  standalone: true,
  selector: 'issue-card',
  templateUrl: './issue-card.component.html',
  imports: [SvgIconComponent, AvatarComponent],
})
@UntilDestroy()
export class IssueCardComponent implements OnChanges, OnInit {
  @Input() issue: IssueSchema;
  assignees: UserSchema[];
  issueTypeIcon: string;
  priorityIcon: IssuePriorityIcon;

  constructor(
    private _store: Store<RootState>,
    private _hlmDialogService: HlmDialogService
  ) {}

  ngOnInit(): void {
    this._store
      .select(state => state.project.users)
      .pipe(untilDestroyed(this))
      .subscribe(users => {
        this.assignees = this.issue.userIds.map(userId =>
          users.find(x => x.id === userId)
        ) as UserSchema[];
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const issueChange = changes['issue'];
    if (issueChange?.currentValue !== issueChange.previousValue) {
      this.issueTypeIcon = IssueUtil.getIssueTypeIcon(this.issue.iss_type);
      this.priorityIcon = IssueUtil.getIssuePriorityIcon(this.issue.priority);
    }
  }

  openIssueModal(issueId: string) {
    this._hlmDialogService.open(IssueModalComponent, {
      context: {
        issue$: this._store.pipe(issueById(issueId)),
      },
    });
  }
}
