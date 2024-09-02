import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { VariableService } from '../../../services/variable.service';
import { user } from '../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: any
  settingStsuts: boolean = false
  constructor(private userservice: UserService, private variableservice: VariableService, private router: Router) {

  }
  ngOnInit() {
    if (this.variableservice.user.id != '') {
      this.fetchUserById(this.variableservice.user.id);
    }
  }

  async fetchUserById(userId: string) {
    this.user = await this.userservice.getUserById(userId).toPromise();
  }

  @HostListener('document:click', ['$event'])
  onclickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.dropdown-container');
    if (!clickedInside) {
      this.settingStsuts = false;
    }
  }

  logout() {
    localStorage.setItem('status', "0")
    localStorage.setItem('token', '');
    this.variableservice.login = true
    window.location.reload()
  }
  toggleSettings() {
    this.settingStsuts = !this.settingStsuts
  }
  goToRegister() {
    this.router.navigateByUrl('/register')
  }
}
