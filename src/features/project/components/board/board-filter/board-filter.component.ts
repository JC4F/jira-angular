import { AvatarComponent } from '@/shared/components/avatar/avatar.component';
import { InputComponent } from '@/shared/components/input/input.component';
import { HlmButtonModule } from '@/shared/components/ui-button-helm/src';
import {
  HlmIconComponent,
  provideIcons,
} from '@/shared/components/ui-icon-helm/src';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemCheckboxDirective,
  HlmMenuItemCheckComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuSeparatorComponent,
} from '@/shared/components/ui-menu-helm/src';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@/shared/components/ui-tooltip-helm/src';
import { FilterActions } from '@/stores/filter/filters.actions';
import { RootState } from '@/stores/root-store';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { lucideMoreHorizontal, lucideTrash } from '@ng-icons/lucide';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FilterUserComponent } from '../filter-user/filter-user.component';

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
    ReactiveFormsModule,
    HlmIconComponent,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuSeparatorComponent,
    HlmMenuItemIconDirective,
    HlmMenuItemCheckComponent,
    HlmMenuGroupComponent,
    HlmMenuItemCheckboxDirective,
    FilterUserComponent,
  ],
  providers: [provideIcons({ lucideTrash, lucideMoreHorizontal })],
})
@UntilDestroy()
export class BoardFilterComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  onlyMyIssue = this._store.select(state => state.filter.onlyMyIssue);
  ignoreResolved = this._store.select(state => state.filter.ignoreResolved);
  hasClearAll = this._store.select(state => {
    const { searchTerm, userIds, onlyMyIssue, ignoreResolved } = state.filter;

    return !!searchTerm || !!userIds?.length || onlyMyIssue || ignoreResolved;
  });

  constructor(private _store: Store<RootState>) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged(), untilDestroyed(this))
      .subscribe(term => {
        this._store.dispatch(FilterActions.searchTerm({ searchTerm: term }));
      });
  }

  ignoreResolvedChanged() {
    this._store.dispatch(FilterActions.toggleIgnoreResolve());
  }

  onlyMyIssueChanged() {
    this._store.dispatch(FilterActions.toggleOnlyMyIssue());
  }

  resetAll() {
    this.searchControl.setValue('');
    this._store.dispatch(FilterActions.resetAll());
  }
}
