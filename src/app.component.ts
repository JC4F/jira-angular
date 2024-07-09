import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { SvgDefinitionsComponent } from './shared/components/svg-definitions/svg-definitions.component';
import { HlmSpinnerComponent } from './shared/components/ui-spinner-helm/src';
import { RootState } from './stores/root-store';
import { AuthActions } from './stores/user/users.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    HlmSpinnerComponent,
    AsyncPipe,
    SvgDefinitionsComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private _store: Store<RootState>) {}

  ngOnInit(): void {
    this._store.dispatch(
      AuthActions.login({ email: 'test', password: 'pw_test' })
    );
    this._store
      .select(state => state.user.isLoading)
      .subscribe(x => console.log('check x: >> ', x));
  }

  isLoading = this._store.select(state => state.user.isLoading);
}
