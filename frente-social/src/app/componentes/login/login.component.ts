import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
//importacoes: componentes
import { CreEntradaComponent } from '../cre-entrada/cre-entrada.component';
//tipos
import { tUsuario } from '../../tipos/comuns';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CreEntradaComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  //#region propriedades
  usuario: tUsuario = {
    nome: '',
    email: '',
    senha: ''
  };
  //#endregion

  //#region eventos
  //classe
  ngOnInit(): void { this.preparaForm() }
  //objetos
  onSubmitForm(form: NgForm): void { this.enviaLogin(form) }
  onChangeEmail(strEmail: string): void { this.atualizaEmail(strEmail) }
  onChangeSenha(strSenha: string): void { this.atualizaSenha(strSenha) }
  onClickBotao(): void { alert('voce clicou em um componente react dentro do angular') }
  //#endregion

  //#region metodos
  preparaForm(): void {}

  validaDados(): boolean {
    //var pendencia
    let strPendencia: string = '';
    //validacoes
    if (!this.usuario.email || this.usuario.email.length == 0) {
      strPendencia = 'Aviso: Campo email esta vazio!';
    } else if (!this.usuario.senha || this.usuario.senha.length == 0) {
      strPendencia = 'Aviso: Campo senha esta vazio!';
    }
    //validacao retorno
    if (strPendencia.length == 0) {
      return true;
    } else {
      alert(strPendencia)
      return false;
    }
  }

  atualizaEmail(strEmail: string): void {
      this.usuario.email = strEmail;
  }

  atualizaSenha(strSenha: string): void {
      this.usuario.senha = strSenha;
  }

  enviaLogin(form: NgForm): void {
    //---------
    if (this.validaDados()) {
      console.log('usuario: ' + this.usuario)
      this.usuario = {email: '', nome: '', senha: ''}
      form.reset()
    }
  }
  //#endregion
}
