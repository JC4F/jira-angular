import {
  HlmIconComponent,
  IconSize,
  provideIcons,
} from '@/shared/components/ui-icon-helm/src';
import { Component, Input } from '@angular/core';
import { lucidePlus, lucideSearch } from '@ng-icons/lucide';
import { NavbarIcon } from '../navbar-left/navbar-left.component';

@Component({
  standalone: true,
  selector: 'navbar-icon',
  imports: [HlmIconComponent],
  templateUrl: './navbar-icon.component.html',
  providers: [provideIcons({ lucideSearch, lucidePlus })],
})
export class NavbarIconComponent {
  @Input() type!: NavbarIcon;
  @Input() size: IconSize = 'base';
  @Input() class = '';

  get iconName() {
    switch (this.type) {
      case 'search':
        return 'lucideSearch';
      case 'plus':
        return 'lucidePlus';
    }
  }
}
