import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    securedApiUrl: string;

    constructor(private auth: AuthService, private router: Router) {
        this.securedApiUrl = "http://localhost:8080/user";
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes(this.securedApiUrl)) {
            return next.handle(req);
        }

        let modifiedRequest = req.clone({
            withCredentials: true
        });

        return next.handle(modifiedRequest).pipe(catchError(x => this.handleAuthError(x)));
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            this.router.navigate(['/login']);
            return of(err.message);
        }
    }
}