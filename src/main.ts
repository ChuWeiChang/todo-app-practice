import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
const { server } = await import('./mock/mock-server');
server.listen();
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
