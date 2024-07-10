import type { ComponentType } from '@angular/cdk/portal';
import { Injectable, type TemplateRef, inject } from '@angular/core';
import {
  type BrnDialogOptions,
  BrnDialogService,
  DEFAULT_BRN_DIALOG_OPTIONS,
  cssClassesToArray,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmSheetContentComponent,
  SheetSide,
} from './hlm-sheet-content.component';
import { hlmSheetOverlayClass } from './hlm-sheet-overlay.directive';

type SheetContextProps = {
  side?: SheetSide;
  $component?: ComponentType<unknown> | TemplateRef<unknown>;
  $dynamicComponentClass?: string;
};

export type HlmSheetOptions<
  SheetContext extends SheetContextProps = SheetContextProps,
> = BrnDialogOptions & {
  contentClass?: string;
  context?: SheetContext;
};

@Injectable({
  providedIn: 'root',
})
export class HlmSheetService {
  private readonly _brnDialogService = inject(BrnDialogService);

  public open(
    component: ComponentType<unknown> | TemplateRef<unknown>,
    options?: Partial<HlmSheetOptions>
  ) {
    options = {
      ...DEFAULT_BRN_DIALOG_OPTIONS,
      closeDelay: 100,

      ...(options ?? {}),
      backdropClass: cssClassesToArray(
        `${hlmSheetOverlayClass} ${options?.backdropClass ?? ''}`
      ),
      context: {
        ...options?.context,
        $component: component,
        $dynamicComponentClass: options?.contentClass,
      },
    };

    return this._brnDialogService.open(
      HlmSheetContentComponent,
      undefined,
      options?.context,
      options
    );
  }
}
