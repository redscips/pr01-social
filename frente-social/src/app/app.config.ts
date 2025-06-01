import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

//configura o roteador p/ recarregar a rota mesmo que a URL seja a mesma
const roteadorConfig = withRouterConfig({ onSameUrlNavigation: 'reload' });

//injetaveis: logicos
//export declare const flg: InjectionToken<boolean>;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, roteadorConfig),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimations()
    //injetaveis: logicos
    //{provide: flg, useValue: false}
    ,
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
