import { Component, OnInit } from '@angular/core';
import { VariableService } from '../../../services/variable.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebar: boolean = false;

  constructor(public variableService: VariableService, private router: Router) {

  }

  togglesidebar() {
    this.variableService.sideBar = !this.variableService.sideBar
  }
  redirect(link: string) {
    this.router.navigateByUrl(link);
  }

}
