import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {
  LoggedIn = signal(false);
  sessionKey = signal('');

  set isLoggedIn(status: boolean) {
    this.LoggedIn.set(status);
  }

  set setSessionKey(key: string) {
    this.sessionKey.set(key);
  }
}
