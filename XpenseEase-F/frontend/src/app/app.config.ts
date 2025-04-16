import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app.component';

// Your route config
import { routes } from './app.routes'; // Assuming routes are in a separate file like routes.ts

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),         // ✅ using routes from routes.ts
    provideHttpClient(),           // ✅ provides HttpClient for your AuthService
    provideAnimationsAsync(),      // ✅ optional animations
  ]
};

bootstrapApplication(AppComponent, appConfig);
