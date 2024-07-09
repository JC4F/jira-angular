import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './project.component.html',
})
export class ProjectComponent {}
