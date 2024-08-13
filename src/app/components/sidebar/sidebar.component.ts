import { Component, OnInit } from '@angular/core';
import { VariableService } from '../../services/variable.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebar: boolean = false;

  constructor(private variableService: VariableService) {

  }

  togglesidebar() {
    this.sidebar = !this.sidebar;
    console.log(this.sidebar);
  }

  logout() {
    localStorage.setItem('status', "0")
    localStorage.setItem('token', '');
    this.variableService.login = true
  }
}
