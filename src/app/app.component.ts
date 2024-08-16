import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { VariableService } from './services/variable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'StockEcom';
  token: any
  decodeToken: any
  status: any
  constructor(public variableService: VariableService, private router: Router) {

  }


  //status 1 = login
  // this.variableService.login = flase    login
  //status 0 = logout
  // this.variableService.login = true  logout
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.status = localStorage.getItem('status')
      this.token = localStorage.getItem('token');
      if ((this.token === undefined || this.token === '') && localStorage.getItem('status') === "0") {
        this.variableService.login = true
        localStorage.setItem('status', "0")
      } else {
        try {
          this.decodeToken = jwtDecode(this.token);
          this.variableService.user = this.decodeToken
          this.variableService.login = false
          localStorage.setItem('status', "1")
        } catch (e) {
          console.log("invalid token", e);
        }
      }
    }
  }
}
