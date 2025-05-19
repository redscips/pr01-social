import { Routes } from '@angular/router';
//importacoes: componentes
import { LoginComponent } from './componentes/login/login.component';
import { EntrarComponent } from './componentes/login/entrar/entrar.component';
import { CadastrarComponent } from './componentes/login/cadastrar/cadastrar.component';
import { InicialComponent } from './componentes/mural/inicial/inicial.component';
import { ClsComumService } from './servicos/cls-comum.service';

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
    path: '',   //redireciona p/ a pagina do mural caso a rota seja vazia
    redirectTo: 'mural',
    pathMatch: 'full'
  },
  {
    path: 'mural',
    component: InicialComponent,
    canActivate: [ClsComumService]
  }
];
