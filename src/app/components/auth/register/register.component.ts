import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';

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

  onEditUser(id:string) {

  }
  deleteUser(id:string) { }
}
