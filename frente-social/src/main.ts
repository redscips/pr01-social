/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//importa raiz dos componentes react
import './app/componentes/react/raiz/Raiz-web.component'

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
