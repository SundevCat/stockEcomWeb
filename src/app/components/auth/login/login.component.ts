import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { VariableService } from '../../../services/variable.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
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

  ngOnInit(): void {
    localStorage.setItem('status', '0');
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
