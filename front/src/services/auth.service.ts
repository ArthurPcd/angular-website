import {Injectable} from '@angular/core';
import {from, Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {environment} from '../environment';
import {CookieService} from 'ngx-cookie-service';

interface LoginFormData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private cookieService: CookieService) {
  }

  tryLogin(data: LoginFormData): Observable<any> {
    return from(
      fetch(`${this.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    ).pipe(
      switchMap(response => {
        if (!response.ok) {
          return throwError(`HTTP error! Status: ${response.status}`);
        }
        return from(response.json());
      }),
      catchError(error => {
        return throwError(error);
      }),
      switchMap(data => {
        if (data.token) {
          // Stocker le token dans un cookie
          this.cookieService.set('token', data.token);
        }
        return from([data]); // Retourner les données originales
      }),
    );
  }


  checkIfUserIsLoggedIn(): Observable<boolean> {
    const token = this.cookieService.get('token');

    if (!token) {
      return from([false]);
    }

    return from(
      fetch(`${this.apiUrl}/me`, {
        method: 'GET',
        headers: {
          Authorization: this.getAuthorizedHeader().Authorization,
        },
      }),
    ).pipe(
      switchMap(response => {
        if (!response.ok) {
          return throwError(`HTTP error! Status: ${response.status}`);
        }
        return from([true]);
      }),
      catchError(error => {
        return from([false]);
      }),
    );
  }

  getAuthorizedHeader() {
    const token = this.cookieService.get('token');
    return {'Authorization': `Bearer ${token}`};
  }

  logout(): Observable<null> {
    return from(
      fetch(`${this.apiUrl}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthorizedHeader(),
      }),
    ).pipe(
      switchMap(response => {
        if (!response.ok) {
          return throwError(`HTTP error! Status: ${response.status}`);
        }
        return from([null]);
      }),
      catchError(error => {
        return throwError(error);
      }),
      switchMap(() => {
        this.cookieService.delete('token');
        return from([null]);
      }),
    );
  }
}
