import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      errorMessage = `Error Code: ${error.status} \n Message:${error.message}`
    }
  }

  public getAllUsers() {
    return this.http.get<user>(`${environment.apiUrl}User/GetAll`)
  }
  public getUserById(id: string) {
    return this.http.get<user>(`${environment.apiUrl}User/GetUserById/${id}`)
  }
  public UpdateUser(id: string, user: user) {
    return this.http.put<user>(`${environment.apiUrl}User/UpdateUser/${id}`, user)
  }
  public DeleteUser(id: string) {
    return this.http.delete<user>(`${environment.apiUrl}User/DeleteUser/${id}`)
  }

  //Authorization//
  public Login(user: user) {
    return this.http.post(`${environment.apiUrl}Auth/Login`, user, { responseType: 'text' as 'json' })
  }
  public Register(user: user) {
    return this.http.post<user>(`${environment.apiUrl}Auth/Register`, user)
  }
}
