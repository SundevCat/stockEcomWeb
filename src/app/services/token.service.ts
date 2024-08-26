import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { VariableService } from './variable.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
            if (error.status === 0) {
              Swal.fire({
                title: `Api Error Status: ${error.status}`,
                icon: 'error',
                showConfirmButton: false
              })
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
