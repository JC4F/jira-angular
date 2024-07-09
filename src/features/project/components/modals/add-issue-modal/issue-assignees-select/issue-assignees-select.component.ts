import { HlmSelectImports } from '@/shared/components/ui-select-helm/src';
import { UserComponent } from '@/shared/components/user/user.component';
import { UserSchema } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';

@Component({
  standalone: true,
  selector: 'issue-assignees-select',
  templateUrl: './issue-assignees-select.component.html',
  imports: [BrnSelectImports, HlmSelectImports, UserComponent, CommonModule],
})
export class IssueAssigneesSelectComponent {
  @Input() control!: FormControl;
  @Input() users!: UserSchema[];

  getUser(userId: string) {
    return this.users.find(user => user.id === userId);
  }
}
