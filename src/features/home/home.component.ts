import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';
import { RootReducerState } from '@/stores/root-store';
import { userReducer } from '@/stores/user/users.reducers';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'home-root',
  standalone: true,
  imports: [RouterOutlet, HlmButtonDirective, AsyncPipe, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  user$ = this.store.select(userReducer.selectUserState);

  constructor(private store: Store<RootReducerState>) {}
}
