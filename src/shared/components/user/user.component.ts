import { UserSchema } from '@/types';
import { Component, Input } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  standalone: true,
  selector: 'base-user',
  templateUrl: './user.component.html',
  imports: [AvatarComponent],
})
export class UserComponent {
  @Input() user!: UserSchema;
}
