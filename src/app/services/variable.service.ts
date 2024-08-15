import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { payload } from '../models/payload';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  private _user: payload = { aud: '', http: '', id: '', iss: '' }
  private _login: boolean = false
  private _sideBar: boolean = true
  constructor() {

  }
  get user(): payload {
    return this._user
  }
  set user(newvalue: payload) {
    this._user = newvalue
  }

  get login(): boolean {
    return this._login
  }
  set login(newvalue: boolean) {
    this._login = newvalue
  }


  get sideBar(): boolean {
    return this._sideBar
  }
  set sideBar(newvalue: boolean) {
    this._sideBar = newvalue;
  }


}
