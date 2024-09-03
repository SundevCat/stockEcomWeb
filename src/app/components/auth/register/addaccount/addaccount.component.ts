import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.component.html',
  styleUrl: './addaccount.component.css'
})
export class AddaccountComponent {

  formRegister: any
  submitted: boolean = false
  confirmpassword: boolean = false

  constructor(private formbuilder: FormBuilder, private userservice: UserService) {
    this.formRegister = this.formbuilder.group({
      id: [""],
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirmpassword: ["", Validators.required]
    })
  }

  async onSubmit() {
    this.submitted = true;

    if (this.formRegister.value.password === this.formRegister.value.confirmpassword) {
      this.confirmpassword = true
    } else {
      this.confirmpassword = false
    }

    if (this.formRegister.valid && this.confirmpassword) {
      this.formRegister.get('confirmpassword').disable();
      //   var user = [{
      //     id: ""
      // name: string
      // email: string
      // password: string
      //   }]
      await this.userservice.Register(this.formRegister.value).toPromise().then(() => window.location.reload())
    }
  }

}
