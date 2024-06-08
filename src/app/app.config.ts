import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideClientHydration(),provideHttpClient(withFetch()), importProvidersFrom(BrowserModule,BrowserAnimationsModule)]
};
