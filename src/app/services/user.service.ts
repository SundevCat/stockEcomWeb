import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { user } from '../models/user';
import { catchError, throwError } from 'rxjs';
import { VariableService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private variableService: VariableService) { }

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
    return this.http.get<user>(`${environment.apiUrl}User/GetUserById/${id}`).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status == 404) {
        this.variableService.login = true
        localStorage.setItem('status', "0")
      }
      return throwError(() => error)
    }))
  }
  public UpdateUser(user: user, id: string) {
    return this.http.put<user>(`${environment.apiUrl}User/UpdateUser/${id}`, user)
  }
  public DeleteUser(id: string) {
    return this.http.delete<user>(`${environment.apiUrl}User/DeleteUser/${id}`)
  }

  public ChangePassword(user: user, id: string) {
    return this.http.patch<user>(`${environment.apiUrl}User/ChangePassword/${id}`, user)
  }

  //Authorization//
  public Login(user: user) {
    return this.http.post(`${environment.apiUrl}Auth/Login`, user, { responseType: 'text' as 'json' })
  }
  public Register(user: user) {
    return this.http.post<user>(`${environment.apiUrl}Auth/Register`, user)
  }
}
