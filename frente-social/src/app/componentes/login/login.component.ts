import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CreEntradaComponent } from '../cre-entrada/cre-entrada.component';


@Component({
  selector: 'app-login',
  imports: [FormsModule, MatCardModule, CreEntradaComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  //funcoes
  atualizaEmail(strEmail: string) {
    this.user.email = strEmail;
  }

  atualizaSenha(strSenha: string) {
    this.user.password = strSenha;
  }

  onLogin() :void {
    // Aqui você pode implementar a lógica de autenticação.
    console.log('Usuário tentando logar com:', this.user);
  }
}
