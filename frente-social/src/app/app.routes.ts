import { Routes } from '@angular/router';
//importacoes: componentes
import { LoginComponent } from './componentes/login/login.component';
import { EntrarComponent } from './componentes/login/entrar/entrar.component';
import { CadastrarComponent } from './componentes/login/cadastrar/cadastrar.component';

//rotas
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [   //subrotas
      { path: '', component: EntrarComponent },   //'/login'
      { path: 'cadastrar', component: CadastrarComponent }    //'/login/cadastrar'
    ]
  },
  {
    path: '',   //redireciona p/ a pagina de login caso a rota seja vazia
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',   //caso rota nao encontrada, redireciona p/ login
    redirectTo: 'login'
  }
];
