import { Component, OnInit } from '@angular/core';
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
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
})
export class NavbarLeftComponent implements OnInit {
  items: NavItem[] = [];
  constructor(
    private _drawerService: NzDrawerService,
    private _modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.items = [
      new NavItem('search', 'Search issues', this.openSearchDrawler.bind(this)),
      new NavItem('plus', 'Create issue', this.openCreateIssueModal.bind(this)),
    ];
  }

  openCreateIssueModal() {
    this._modalService.create({
      nzContent: AddIssueModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700,
    });
  }

  openSearchDrawler() {
    this._drawerService.create({
      nzContent: SearchDrawerComponent,
      nzTitle: null,
      nzPlacement: 'left',
      nzClosable: false,
      nzWidth: 500,
    });
  }
}
