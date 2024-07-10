import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarLeftComponent } from '../navbar-left/navbar-left.component';
import { ResizerComponent } from '../resizer/resizer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  imports: [NavbarLeftComponent, SidebarComponent, ResizerComponent],
})
export class NavigationComponent {
  @Input() expanded: boolean;
  @Output() manualToggle = new EventEmitter();

  toggle() {
    this.manualToggle.emit();
  }
}
