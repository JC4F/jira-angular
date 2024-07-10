import { AvatarComponent } from '@/shared/components/avatar/avatar.component';
import { InputComponent } from '@/shared/components/input/input.component';
import { HlmButtonModule } from '@/shared/components/ui-button-helm/src';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@/shared/components/ui-tooltip-helm/src';
import { FilterActions } from '@/stores/filter/filters.actions';
import { RootState } from '@/stores/root-store';
import { UserSchema } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'board-filter',
  templateUrl: './board-filter.component.html',
  imports: [
    AvatarComponent,
    InputComponent,
    CommonModule,
    HlmButtonModule,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
  ],
})
@UntilDestroy()
export class BoardFilterComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  userIds: string[];
  projectUsers = this._store.select(state => state.project.users);
  onlyMyIssue = this._store.select(state => state.filter.onlyMyIssue);
  ignoreResolved = this._store.select(state => state.filter.ignoreResolved);
  hasClearAll = this._store.select(state => {
    const { searchTerm, userIds, onlyMyIssue, ignoreResolved } = state.filter;

    return !!searchTerm || !!userIds?.length || onlyMyIssue || ignoreResolved;
  });

  constructor(private _store: Store<RootState>) {
    this.userIds = [];
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged(), untilDestroyed(this))
      .subscribe(term => {
        this._store.dispatch(FilterActions.searchTerm(term));
      });

    this._store
      .select(state => state.filter.userIds)
      .pipe(untilDestroyed(this))
      .subscribe(userIds => {
        this.userIds = userIds;
      });
  }

  isUserSelected(user: UserSchema) {
    return this.userIds.includes(user.id);
  }

  ignoreResolvedChanged() {
    this._store.dispatch(FilterActions.toggleIgnoreResolve());
  }

  onlyMyIssueChanged() {
    this._store.dispatch(FilterActions.toggleOnlyMyIssue());
  }

  userChanged(user: UserSchema) {
    this._store.dispatch(FilterActions.toggleUserId({ userId: user.id }));
  }

  resetAll() {
    this.searchControl.setValue('');
    this._store.dispatch(FilterActions.resetAll());
  }
}
