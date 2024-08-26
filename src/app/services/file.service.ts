import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }
  public downloadFile(file: string) {
    return this.http.get(`${environment.apiUrl}Files/FileTemplateProduct/${file}`, { responseType: 'blob' })
  }

}
