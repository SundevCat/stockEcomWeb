import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  private _user: any
  private _login: boolean = false
  constructor() { }
  get user(): any {
    return this._user
  }
  set user(newvalue: any) {
    this._user = newvalue
  }

  get login(): boolean {
    return this._login
  }
  set login(newvalue: boolean) {
    this._login = newvalue
  }
}
