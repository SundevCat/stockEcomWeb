import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  dtoptions: Config = {}
  dtTrigger: Subject<any> = new Subject<any>()
  user: any[] = []
  constructor(private userserives: UserService) { }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.dtoptions = {
        pagingType: 'full_numbers',
      }
      this.fetchUser()
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  async fetchUser() {
    await this.userserives.getAllUsers().toPromise().then((data) => {
      this.user = this.user.concat(data)
      this.dtTrigger.next(null)
    })
  }

  onEditUser(id: string) {

  }

  deleteUser(userId: string) {
    Swal.fire({
      title: 'คุณต้องการลบบัญชีนี้หรือไม่',
      showCancelButton: true,
      showConfirmButton: true,
      icon: 'warning',
      confirmButtonColor: ' #d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No',
    }).then(async (confirm) => {
      if (confirm.isConfirmed) {
        this.user.splice(this.user.findIndex(item => item.id == userId), 1)
        await this.userserives.DeleteUser(userId).toPromise().then(() => {
          Swal.fire({
            title: 'ลบสำเร็จ',
            timer: 1000,
            icon: 'success',
            showConfirmButton: false,
            showCloseButton: false
          })
        })
      }
    })
  }
}
