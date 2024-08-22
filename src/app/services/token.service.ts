import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { VariableService } from './variable.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {
  constructor(private router: Router, private variableService: VariableService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token != null) {
        const clonedRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.router.navigate(['/'])
              this.variableService.login = true
              localStorage.setItem('status', "0")
            }
            console.log(error.status);

            return throwError(() => error)
          })
        );
      }
    }
    console.log(req);
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/'])
          this.variableService.login = true
          localStorage.setItem('status', "0")
        }
        console.log(error.status);

        return throwError(() => error)
      })
    );
  }
}
