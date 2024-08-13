import { Component } from '@angular/core';
import { user } from '../../../models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { catchError, throwError } from 'rxjs';
import { VariableService } from '../../../services/variable.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: any
  status: boolean = true
  token: any
  constructor(public userService: UserService, formbuilder: FormBuilder, private variableService: VariableService) {
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
        localStorage.setItem('token', data.toString())
        this.variableService.login = false
        this.status = true
      },
      error => { this.status = false }
    )

  }
}
