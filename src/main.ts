import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
bootstrapApplication(AppComponent, { providers: [provideHttpClient(), provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }))] }).catch(console.error);
