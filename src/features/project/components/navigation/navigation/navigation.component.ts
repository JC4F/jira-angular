import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarLeftComponent } from '../navbar-left/navbar-left.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  imports: [NavbarLeftComponent, SidebarComponent],
})
export class NavigationComponent implements OnInit, OnDestroy {
  expanded: boolean;
  isLargeDesktop: boolean;
  private mediaQueryList: MediaQueryList;
  private mediaQueryListener: (e: MediaQueryListEvent) => void;

  initIsLargeDesktop() {
    this.isLargeDesktop = window.innerWidth > 1024;
    this.expanded = window.innerWidth > 1024;
  }

  handleResize() {
    this.mediaQueryList = window.matchMedia('(min-width: 1024px)');
    this.mediaQueryListener = e => {
      console.log('project resized>>>: ', e);
      this.isLargeDesktop = e.matches;
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

  ngOnInit(): void {
    this.initIsLargeDesktop();
    this.handleResize();
  }

  // @Output() manualToggle = new EventEmitter();

  // toggle() {
  //   this.manualToggle.emit();
  // }
}
