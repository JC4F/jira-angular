import { SvgDefinitionsComponent } from '@/shared/components/svg-definitions/svg-definitions.component';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavigationComponent } from './components/navigation/navigation/navigation.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterOutlet, SvgDefinitionsComponent, NavigationComponent],
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit, OnDestroy {
  expanded: boolean;
  private mediaQueryList: MediaQueryList;
  private mediaQueryListener: (e: MediaQueryListEvent) => void;

  constructor(private _store: Store<RootState>) {
    this.expanded = true;
  }

  ngOnInit(): void {
    this._store.dispatch(ProjectActions.fetchProject());
    this.handleResize();
  }

  handleResize() {
    this.mediaQueryList = window.matchMedia('(min-width: 1024px)');
    this.mediaQueryListener = e => {
      console.log('project resized>>>: ', e);
      this.expanded = e.matches;
    };
    this.mediaQueryList.addEventListener('change', this.mediaQueryListener);
  }

  ngOnDestroy(): void {
    if (this.mediaQueryList) {
      this.mediaQueryList.removeEventListener(
        'change',
        this.mediaQueryListener
      );
    }
  }

  manualToggle() {
    this.expanded = !this.expanded;
  }
}
