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
  onChangeEmail(evento: Event): void { this.atualizaEmail(evento) }
  onChangeSenha(evento: Event): void { this.atualizaSenha(evento) }
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

  atualizaEmail(evento: Event): void {
    const entrada = (evento.target as HTMLInputElement).value;
    this.usuario.email = entrada;
  }

  atualizaSenha(evento: Event): void {
    const entrada = (evento.target as HTMLInputElement).value;
    this.usuario.senha = entrada;
  }

  enviaLogin(): void {
    //---------
    if (this.validaDados()) {
      console.log('usuario: ' + this.usuario)
      //reseta variaveis controle
      this.usuario = {email: '', nome: '', senha: ''}
      this.flgSubmit = false
      this.fgLoginForm.reset()    //reseta formulario
    }
  }
  //#endregion
}
