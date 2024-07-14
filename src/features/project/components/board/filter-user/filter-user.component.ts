import { AvatarComponent } from '@/shared/components/avatar/avatar.component';
import { HlmCheckboxComponent } from '@/shared/components/ui-checkbox-helm/src';
import { HlmLabelDirective } from '@/shared/components/ui-label-helm/src';
import {
  HlmPopoverCloseDirective,
  HlmPopoverContentDirective,
} from '@/shared/components/ui-popover-helm/src';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@/shared/components/ui-tooltip-helm/src';
import { UserComponent } from '@/shared/components/user/user.component';
import { FilterActions } from '@/stores/filter/filters.actions';
import { RootState } from '@/stores/root-store';
import { UserSchema } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import {
  BrnPopoverCloseDirective,
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';

@Component({
  standalone: true,
  selector: 'board-filter-user',
  templateUrl: './filter-user.component.html',
  imports: [
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,

    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    BrnPopoverCloseDirective,
    HlmPopoverContentDirective,
    HlmPopoverCloseDirective,

    HlmLabelDirective,
    HlmCheckboxComponent,

    AvatarComponent,
    CommonModule,
    UserComponent,
  ],
})
@UntilDestroy()
export class FilterUserComponent implements OnInit {
  maxUserShow = 2;
  remainUsers = 0;
  userIds: string[] = [];
  projectUsers = this._store.select(state => state.project.users);

  constructor(private _store: Store<RootState>) {}

  ngOnInit() {
    this._store
      .select(state => state.filter.userIds)
      .pipe(untilDestroyed(this))
      .subscribe(userIds => {
        this.userIds = userIds;
      });

    this.projectUsers.subscribe(projectUsers => {
      this.remainUsers = projectUsers.length - this.maxUserShow;
    });
  }

  isUserSelected(user: UserSchema) {
    return this.userIds.includes(user.id);
  }

  userChanged(user: UserSchema) {
    this._store.dispatch(FilterActions.toggleUserId({ userId: user.id }));
  }

  handleCheckChanged(event: unknown, user: UserSchema) {
    this.userChanged(user);
  }
}
