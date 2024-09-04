import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) { }

  public getLogsAll() {
    return this.http.get(`${environment.apiUrl}Log/GetLogs`)
  }
  public GetLogById(id: string) {
    return this.http.get(`${environment.apiUrl}Log/GetLogsById/${id}`)
  }
}
