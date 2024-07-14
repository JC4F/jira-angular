import { ProjectConst } from '@/constants';
import { BreadcrumbsComponent } from '@/shared/components/breadcrumbs/breadcrumbs.component';
import { issueById } from '@/stores/project/project.selector';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { DeleteIssueModel, IssueSchema, ProjectSchema } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IssueDetailComponent } from '../../components/issues/issue-detail/issue-detail.component';

@Component({
  standalone: true,
  selector: 'full-issue-detail',
  templateUrl: './full-issue-detail.component.html',
  imports: [BreadcrumbsComponent, IssueDetailComponent, CommonModule],
})
@UntilDestroy()
export class FullIssueDetailComponent implements OnInit {
  project: ProjectSchema;
  issueById$: Observable<IssueSchema>;
  issueId: string;
  isModal = false;
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name, 'Issues', this.issueId];
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.getIssue();
    this._store
      .select(state => state.project)
      .pipe(untilDestroyed(this))
      .subscribe(project => {
        this.project = project;
      });
  }

  deleteIssue({ issueId, _dialogRef }: DeleteIssueModel) {
    this._store.dispatch(ProjectActions.deleteIssues({ issueId }));
    _dialogRef.close();
    this.backProjectBoard();
  }

  private getIssue() {
    this.issueId = this._route.snapshot.paramMap.get(
      ProjectConst.IssueId
    ) as string;
    if (!this.issueId) {
      this.isModal = true;
      this.backProjectBoard();
      return;
    }
    this.issueById$ = this._store.pipe(
      issueById(this.issueId)
    ) as Observable<IssueSchema>;
    this.isModal = false;
  }

  private backProjectBoard() {
    this._router.navigate(['/project/board']);
  }
}
