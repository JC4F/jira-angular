import { InputComponent } from '@/shared/components/input/input.component';
import { SvgIconComponent } from '@/shared/components/svg-icon/svg-icon.component';
import { HlmDialogService } from '@/shared/components/ui-dialog-helm/src';
import { IssueUtil } from '@/shared/utils/issue';
import { issueById } from '@/stores/project/project.selector';
import { RootState } from '@/stores/root-store';
import { IssueSchema } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { BrnDialogRef } from '@spartan-ng/ui-dialog-brain';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { IssueModalComponent } from '../../issues/issue-modal/issue-modal.component';
import { IssueResultComponent } from '../issue-result/issue-result.component';

@Component({
  standalone: true,
  selector: 'search-drawer',
  templateUrl: './search-drawer.component.html',
  imports: [
    InputComponent,
    SvgIconComponent,
    CommonModule,
    IssueResultComponent,
  ],
})
@UntilDestroy()
export class SearchDrawerComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  results$: Observable<IssueSchema[]>;
  recentIssues$: Observable<IssueSchema[]>;

  get hasSearchTermInput(): boolean {
    return !!this.searchControl.value;
  }

  constructor(
    private _hlmDialogService: HlmDialogService,
    private readonly _dialogRef: BrnDialogRef,
    private _store: Store<RootState>
  ) {}

  ngOnInit(): void {
    const search$ = this.searchControl.valueChanges.pipe(
      debounceTime(50),
      startWith(this.searchControl.value)
    );

    this.recentIssues$ = this._store
      .select(state => state.project.issues)
      .pipe(map(issues => issues.slice(0, 5)));

    this.results$ = combineLatest([
      search$,
      this._store.select(state => state.project.issues),
    ]).pipe(
      untilDestroyed(this),
      switchMap(([term, issues]) => {
        const matchIssues = issues.filter(issue => {
          const foundInTitle = IssueUtil.searchString(issue.title, term);
          const foundInDescription = IssueUtil.searchString(
            issue.description,
            term
          );
          return foundInTitle || foundInDescription;
        });
        return of(matchIssues);
      })
    );
  }

  closeDrawer() {
    this._dialogRef.close();
  }

  openIssueModal(issue: IssueSchema) {
    this._hlmDialogService.open(IssueModalComponent, {
      context: {
        issue$: this._store.pipe(issueById(issue.id)),
      },
    });
    this.closeDrawer();
  }
}
