import { SvgDefinitionsComponent } from '@/shared/components/svg-definitions/svg-definitions.component';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavigationComponent } from './components/navigation/navigation/navigation.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterOutlet, SvgDefinitionsComponent, NavigationComponent],
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
  expanded: boolean;
  isLargeDesktop: boolean;
  private mediaQueryList: MediaQueryList;
  private mediaQueryListener: (e: MediaQueryListEvent) => void;

  constructor(private _store: Store<RootState>) {
    this.expanded = true;
  }

  ngOnInit(): void {
    this._store.dispatch(ProjectActions.fetchProject());
  }
}
