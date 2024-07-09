import { HlmDialogService } from '@/shared/components/ui-dialog-helm/src';
import { Component, inject, OnInit } from '@angular/core';
import { AddIssueModalComponent } from '../../modals/add-issue-modal/add-issue-modal.component';
import { SearchDrawerComponent } from '../../search/search-drawer/search-drawer.component';

class NavItem {
  constructor(
    public icon: string,
    public tooltip: string,
    public handler: Handler
  ) {}
}

type Handler = () => void;

@Component({
  standalone: true,
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
})
export class NavbarLeftComponent implements OnInit {
  items: NavItem[] = [];
  private readonly _hlmDialogService = inject(HlmDialogService);

  ngOnInit(): void {
    this.items = [
      new NavItem('search', 'Search issues', this.openSearchDrawler.bind(this)),
      new NavItem('plus', 'Create issue', this.openCreateIssueModal.bind(this)),
    ];
  }

  openCreateIssueModal() {
    this._hlmDialogService.open(AddIssueModalComponent);
  }

  openSearchDrawler() {
    this._hlmDialogService.open(SearchDrawerComponent);
  }
}
