import { Component } from '@angular/core';
import { user } from '../../../models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { catchError, throwError } from 'rxjs';
import { VariableService } from '../../../services/variable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: any
  status: boolean = true
  token: any
  constructor(public userService: UserService, formbuilder: FormBuilder, private variableService: VariableService, private router: Router) {
    this.formLogin = formbuilder.group({
      Id: "null",
      Name: "null",
      Email: ["", [Validators.required, Validators.email]],
      Password: ["", [Validators.required]]
    })
  }

  handleSubmit() {

    this.userService.Login(this.formLogin.value).subscribe(
      data => {
        console.log('onlogin');
        localStorage.setItem('token', data.toString())
        this.variableService.login = false
        localStorage.setItem('status', '1');
        this.status = true
         window.location.reload()
      },
      error => { this.status = false }
    )

  }
}
