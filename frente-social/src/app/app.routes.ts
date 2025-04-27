import { Routes } from '@angular/router';
//importacoes: componentes
import { LoginComponent } from './componentes/login/login.component';

//rotas
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    //redireciona p/ a pagina de login caso a rota seja vazia
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    //caso rota nao encontrada, redireciona p/ login
    path: '**',
    redirectTo: 'login'
  }
];
