import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
//importacoes: componentes
import { CreEntradaComponent } from '../cre-entrada/cre-entrada.component';
//tipos
import { tUsuario } from '../../tipos/comuns';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CreEntradaComponent, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  //#region propriedades
  fgLoginForm!: FormGroup;
  usuario!: tUsuario ;
  //#endregion

  flgSubmit: boolean = false;

  constructor(private fbLoginForm: FormBuilder) {}

  //#region eventos
  //classe
  ngOnInit(): void { this.preparaForm() }
  //objetos
  onSubmitForm(): void { this.enviaLogin() }
  onChangeEmail(strEmail: string): void { this.atualizaEmail(strEmail) }
  onChangeSenha(strSenha: string): void { this.atualizaSenha(strSenha) }
  onClickBotao(): void { alert('voce clicou em um componente react dentro do angular') }
  //#endregion

  //#region metodos
  preparaForm(): void {
    //iniciando
    this.usuario = {email: '', nome: '', senha: ''}
    //configura formulario
    this.fgLoginForm = this.fbLoginForm.group({
      email: ['', [
        Validators.required,    //obrigatorio
        Validators.email,   //validacoes de email
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')   //formato obrigatorio do dado: ____@____.____
      ]],
      senha: ['', [
        Validators.required,
        Validators.minLength(8)   //tamanho minimo da senha
      ]]
    });
  }

  get getForm() {
    return this.fgLoginForm.controls;
  }

  validaDados(): boolean {
    //controle submit
    this.flgSubmit = true;
    //retorna verdadeiro caso formulario esteja valido
    return this.fgLoginForm.valid
  }

  atualizaEmail(strEmail: string): void {
      this.usuario.email = strEmail;
  }

  atualizaSenha(strSenha: string): void {
      this.usuario.senha = strSenha;
  }

  enviaLogin(): void {
    //---------
    if (this.validaDados()) {
      console.log('usuario: ' + this.usuario)
      this.usuario = {email: '', nome: '', senha: ''}
    }
  }
  //#endregion
}
