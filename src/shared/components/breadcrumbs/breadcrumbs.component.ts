import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  imports: [CommonModule],
})
export class BreadcrumbsComponent {
  @Input() items: string[] = [];
}
