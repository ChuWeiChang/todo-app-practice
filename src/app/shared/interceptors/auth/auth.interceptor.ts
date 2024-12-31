import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginStateService} from '../../services/auth/login-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginState: LoginStateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sessionKey = this.loginState.sessionKey();

    if (sessionKey) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: sessionKey
        }
      });

      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}
