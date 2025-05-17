import { Component } from '@angular/core';
import { EntrarComponent } from './entrar/entrar.component';
//import { CadastrarComponent } from './cadastrar/cadastrar.component';

@Component({
  selector: 'app-login',
  imports: [EntrarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

}
