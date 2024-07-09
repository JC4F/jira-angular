import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideXCircle } from '@ng-icons/lucide';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { HlmIconComponent } from '../ui-icon-helm/src/lib/hlm-icon.component';
import { HlmInputDirective } from '../ui-input-helm/src';

@Component({
  standalone: true,
  selector: 'base-input',
  templateUrl: './input.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SvgIconComponent,
    HlmIconComponent,
    HlmInputDirective,
  ],
  providers: [provideIcons({ lucideXCircle })],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() containerClassName = '';
  @Input() icon: string;
  @Input() iconSize = 16;
  @Input() placeholder = '';
  @Input() enableClearButton: boolean;

  get iconContainerWidth(): number {
    return this.iconSize * 2;
  }

  get isShowClearButton(): boolean {
    return this.enableClearButton && this.control?.value;
  }

  ngOnInit(): void {
    this.control = this.control ?? new FormControl('');
  }

  clear() {
    this.control.patchValue('');
  }
}
