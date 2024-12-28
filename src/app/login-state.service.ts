import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {
  LoggedIn = signal(false);
  sessionKey = signal('');
}
