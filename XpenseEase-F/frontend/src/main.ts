// Import necessary Angular functions and components
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Optional if used
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';  // ✅ Add this

// Bootstrap the standalone component
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),  // ✅ Provide HttpClient for standalone DI
    // ...spread any other providers like appConfig if needed
  ],
}).catch(err => console.error('Error during bootstrap:', err));