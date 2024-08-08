import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebar: boolean = false;

  togglesidebar() {
    this.sidebar = !this.sidebar;
    console.log(this.sidebar);
  }
}
