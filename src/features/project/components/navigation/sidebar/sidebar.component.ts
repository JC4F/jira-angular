import { SideBarLinks } from '@/constants';
import { AvatarComponent } from '@/shared/components/avatar/avatar.component';
import { SvgIconComponent } from '@/shared/components/svg-icon/svg-icon.component';
import { RootState } from '@/stores/root-store';
import { ProjectSchema, SideBarLink } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    AvatarComponent,
    CommonModule,
    RouterLink,
    SvgIconComponent,
    RouterLinkActive,
  ],
})
@UntilDestroy()
export class SidebarComponent implements OnInit {
  @Input() expanded: boolean;

  get sidebarWidth(): number {
    return this.expanded ? 240 : 15;
  }

  project: ProjectSchema;
  sideBarLinks: SideBarLink[];

  constructor(private _store: Store<RootState>) {
    this._store
      .select(state => state.project)
      .pipe(untilDestroyed(this))
      .subscribe(project => {
        this.project = project;
      });
  }

  ngOnInit(): void {
    this.sideBarLinks = SideBarLinks;
  }
}
