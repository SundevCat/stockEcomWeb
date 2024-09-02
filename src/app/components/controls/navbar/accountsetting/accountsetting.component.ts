import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VariableService } from '../../../../services/variable.service';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accountsetting',
  templateUrl: './accountsetting.component.html',
  styleUrl: './accountsetting.component.css'
})
export class AccountsettingComponent implements OnInit {
  formAccountSetting: any
  formChangepassword: any
  matchPassword: boolean = false
  user: any
  onsubmitted: boolean = false
  onsubmitPassword: boolean = false
  constructor(private formBuilder: FormBuilder, private variableservice: VariableService, private userserive: UserService) {
    this.formAccountSetting = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
    this.formChangepassword = this.formBuilder.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.fetchUser();
  }

  async fetchUser() {
    if (this.variableservice.user.id) {
      this.user = await this.userserive.getUserById(this.variableservice.user.id).toPromise()
      this.formAccountSetting = this.formBuilder.group({
        id: [this.user.id],
        name: [this.user.name, Validators.required],
        email: [this.user.email, Validators.required],
        password: [this.user.password, Validators.required]
      })
    }
  }

  onsubmit() {
    this.onsubmitted = true
    if (this.formAccountSetting.valid) {
      Swal.fire({
        title: 'ยืนยันการเปลี่ยนข้อมูลหรือไม่',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        showCancelButton: true,
        icon: 'warning',
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        preConfirm: async () => {
          Swal.update({
            title: 'กำลังอัพเดทรอสักครู่',
            showCancelButton: false,
            confirmButtonText: 'Uploading...',
            allowOutsideClick: false
          });
          console.log(this.formAccountSetting.value);

          await this.userserive.UpdateUser(this.formAccountSetting.value, this.variableservice.user.id).toPromise().then(() => { return true });
        }
      }).then((confirm) => {
        if (confirm.isConfirmed) {
          Swal.fire({
            title: 'เปลี่ยนแปลงข้อมูลสำเร็จ',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          }).then(() => window.location.reload())
        }
      })
    }
  }

  onchangePassword() {
    this.onsubmitPassword = true
    if (this.formChangepassword.valid) {
      if (this.formChangepassword.value.password === this.formChangepassword.value.confirmPassword) {
        this.formAccountSetting.value.password = this.formChangepassword.value.password
        Swal.fire({
          title: 'ยืนยันการเปลี่ยนรหัสผ่านหรือไม่',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true,
          icon: 'warning',
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          preConfirm: async () => {
            Swal.update({
              title: 'กำลังอัพเดทรอสักครู่',
              showCancelButton: false,
              confirmButtonText: 'Uploading...',
              allowOutsideClick: false
            });
            await this.userserive.ChangePassword(this.formAccountSetting.value, this.variableservice.user.id).toPromise().then(() => { return true });
          }
        }).then((confirm) => {
          if (confirm.isConfirmed) {
            Swal.fire({
              title: 'เปลี่ยนแปลงข้อมูลสำเร็จ',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000
            }).then(() => window.location.reload())
          }
        })
      } else {
        this.matchPassword = false;
      }
    }
  }
}
