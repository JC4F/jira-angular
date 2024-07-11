import { HlmIconComponent } from '@/shared/components/ui-icon-helm/src';
import { NgComponentOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';
import { hlm, injectExposedSideProvider } from '@spartan-ng/ui-core';
import {
  BrnDialogRef,
  injectBrnDialogContext,
} from '@spartan-ng/ui-dialog-brain';
import { BrnSheetCloseDirective } from '@spartan-ng/ui-sheet-brain';
import { cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';
import { HlmSheetCloseDirective } from './hlm-sheet-close.directive';

export type SheetSide = 'top' | 'bottom' | 'left' | 'right' | null | undefined;

export const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'border-border inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'border-border inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'border-border inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'border-border inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

@Component({
  selector: 'hlm-sheet-content',
  standalone: true,
  imports: [
    NgComponentOutlet,
    HlmSheetCloseDirective,
    BrnSheetCloseDirective,
    HlmIconComponent,
  ],
  providers: [provideIcons({ lucideX })],
  host: {
    '[class]': '_computedClass()',
    '[attr.data-state]': 'state()',
  },
  template: `
    @if (component) {
      <ng-container [ngComponentOutlet]="component" />
    } @else {
      <ng-content />
    }
    <ng-content />
    <!-- <button brnSheetClose hlm>
      <span class="sr-only">Close</span>
      <hlm-icon class="flex w-4 h-4" size="100%" name="lucideX" />
    </button> -->
  `,
})
export class HlmSheetContentComponent implements OnInit {
  private readonly _dialogRef = inject(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext({ optional: true });

  public readonly state = computed(() => this._dialogRef?.state() ?? 'closed');
  public readonly component = this._dialogContext?.$component;
  private readonly _dynamicComponentClass =
    this._dialogContext?.$dynamicComponentClass;
  private readonly _sideSignal = signal<SheetSide>(this._dialogContext?.side);

  // private _stateProvider = injectExposesStateProvider({ host: true });
  // private _sideProvider = injectExposedSideProvider({ host: true });
  // public state = this._stateProvider.state ?? signal('closed');
  private _renderer = inject(Renderer2);
  private _element = inject(ElementRef);

  constructor() {
    effect(() => {
      this._renderer.setAttribute(
        this._element.nativeElement,
        'data-state',
        this.state()
      );
    });
  }

  ngOnInit(): void {
    try {
      const _sideProvider = injectExposedSideProvider({ host: true });
      this._sideSignal.set(_sideProvider.side());
    } catch (error) {
      console.log('Catch side err>>: ', error);
    }
  }

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(
      sheetVariants({ side: this._sideSignal() }),
      this.userClass(),
      this._dynamicComponentClass
    )
  );
}
