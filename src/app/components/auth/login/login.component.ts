import { Component } from '@angular/core';
import { user } from '../../../models/user';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formLogin: any
  constructor(public userService: UserService, public formbuilder: FormBuilder) {
    this.formLogin = formbuilder.group({
      email: null,
      password: null
    })
  }
  handleSubmit() {
    console.log(this.formLogin.value);
    // this.userService.Login(this.formLogin.value).subscribe({
    //   next: (data) => {
    //     console.log(data);

    //   }
    // })
  }
}
