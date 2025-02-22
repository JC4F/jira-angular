import { HlmIconComponent } from '@/shared/components/ui-icon-helm/src';
import { Component, computed, inject, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { BrnCheckboxComponent } from '@spartan-ng/ui-checkbox-brain';
import { hlm } from '@spartan-ng/ui-core';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-checkbox-checkicon',
  standalone: true,
  imports: [HlmIconComponent],
  providers: [provideIcons({ lucideCheck })],
  host: {
    '[class]': '_computedClass()',
  },
  template: ` <hlm-icon size="sm" [name]="iconName()" /> `,
})
export class HlmCheckboxCheckIconComponent {
  private _brnCheckbox = inject(BrnCheckboxComponent);
  protected _checked = this._brnCheckbox?.isChecked;
  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  public readonly iconName = input<string>('lucideCheck');

  protected _computedClass = computed(() =>
    hlm(
      'h-4 w-4 leading-none group-data-[state=unchecked]:opacity-0',
      this._checked() === 'indeterminate' ? 'opacity-50' : '',
      this.userClass()
    )
  );
}
