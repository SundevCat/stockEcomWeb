import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  public getAllUsers() {
    return this.http.get<user>(`${environment}User/GetAll`)
  }
  public Login(user: user) {
    return this.http.post<user>(`${environment}User/Login`, user)
  }

}
