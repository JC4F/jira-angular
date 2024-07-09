import { HlmIconComponent } from '@/shared/components/ui-icon-helm/src';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronUp } from '@ng-icons/lucide';

@Component({
  selector: 'hlm-select-scroll-up',
  standalone: true,
  imports: [HlmIconComponent],
  providers: [provideIcons({ lucideChevronUp })],
  host: {
    class: 'flex cursor-default items-center justify-center py-1',
  },
  template: ` <hlm-icon class="w-4 h-4 ml-2" name="lucideChevronUp" /> `,
})
export class HlmSelectScrollUpComponent {}
