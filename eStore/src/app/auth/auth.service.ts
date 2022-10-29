import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // BehaviorSubject : gives subscribers immediate access to the previously emitted value,
  // even if they haven't subscribed at the point of time that value was emitted.
  // That means we can get access to the currently active user even if we only subscribe after that user has been emitted.
  // Which means again when we fetch data and we need that token at this point of time, even if the user is already logged in.

  user = new BehaviorSubject<User>(null); // needs to be initialized => (null)
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.HandleErrorResponse),
        tap((res) =>
          this.HandleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          )
        )
      );
    // Tap() operator will of course not change the response body but thus execute some code before giving hand
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.HandleErrorResponse),
        tap((res) =>
          this.HandleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          )
        )
      );
    // Tap() operator will of course not change the response body but thus execute some code before giving hand);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);

      const remainingTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(remainingTime);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null; // for the next check and so on ...
  }

  autoLogout(duration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private HandleAuthentication(
    email: string,
    userId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); // expiresIn  it's in sec, reason why we multiple by 1000 th get it in milliseconds instead
    const user = new User(email, userId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private HandleErrorResponse(err: HttpErrorResponse) {
    let message = 'An unknown error occurred';
    if (!err.error || !err.error.error) {
      // We're checking here if the response error has keys and values for error and error.error
      return throwError(message);
    }

    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        message = 'This email exists already';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        message =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        message = 'There is no user record corresponding to this email';
        break;
      case 'INVALID_PASSWORD':
        message = 'The password is invalid';
        break;
      case 'USER_DISABLED':
        'The user account has been disabled by an administrator';
    }
    return throwError(message);
  }
}
