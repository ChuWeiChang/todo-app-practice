import {CanActivateFn, Router} from '@angular/router';
import {LoginStateService} from './login-state.service';
import {inject} from '@angular/core';

export const routeGuard: CanActivateFn = (route) => {
  const loginState = inject(LoginStateService);
  const router = inject(Router);

  const isLoggedIn = loginState.LoggedIn();

  if (isLoggedIn && route.routeConfig?.path === 'login') {
    router.navigate(['/dashboard']).then(() => {
      console.log("blocked");
    });
    return false;
  }

  if (!isLoggedIn && route.routeConfig?.path !== 'login') {
    router.navigate(['/login']).then(() => {
      console.log("blocked");
    });
    return false;
  }

  return true;
};


