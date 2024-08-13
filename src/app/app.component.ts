import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { VariableService } from './services/variable.service';

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
  constructor(public variableService: VariableService) {

  }



  ngOnInit(): void {
    this.status = localStorage.getItem('status')
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
      if ((this.token === undefined || this.token === '') && localStorage.getItem('status') === "0") {
        this.variableService.login = true
        localStorage.setItem('status', "0")
      } else {
        console.log(this.token);
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
