import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { VariableService } from '../../../services/variable.service';
import { user } from '../../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: any
  settingStsuts: boolean = false
  constructor(private userservice: UserService, private variableservice: VariableService,) {

  }
  ngOnInit(): void {
    if (this.variableservice.user.id != '') {
      this.userservice.getUserById(this.variableservice.user.id).subscribe(data => {
        this.user = data
      })
    }
  }

  @HostListener('document:click', ['$event'])
  onclickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.dropdown-container');
    console.log(clickedInside);
    
    if (!clickedInside) {
      this.settingStsuts = false;
    }
  }

  logout() {
    localStorage.setItem('status', "0")
    localStorage.setItem('token', '');
    this.variableservice.login = true
  }
  toggleSettings() {
    this.settingStsuts = !this.settingStsuts
  }
}
