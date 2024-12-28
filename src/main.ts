import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { worker } from './mock/mock-server';
worker.start().then();
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
