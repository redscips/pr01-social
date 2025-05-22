import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideHttpClient, withFetch } from '@angular/common/http';

//configura o roteador p/ recarregar a rota mesmo que a URL seja a mesma
const roteadorConfig = withRouterConfig({ onSameUrlNavigation: 'reload' });

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, roteadorConfig),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimations()
  ]
};
