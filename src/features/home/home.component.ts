import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';
import { Store } from '@ngrx/store';
import { RootState } from '@/stores/root-store';
import { userReducer } from '@/stores/user/users.reducers';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'home-root',
  standalone: true,
  imports: [RouterOutlet, HlmButtonDirective, AsyncPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  user$ = this.store.select(userReducer.selectUserState);

  constructor(private store: Store<RootState>) {}
}
