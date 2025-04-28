import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
//importacoes: tipos
import { tUsuario } from '../../tipos/comuns';
//componentes
import { CreEntradaComponent } from '../cre-entrada/cre-entrada.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CreEntradaComponent],
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
  //#endregion

  //#region metodos
  preparaForm(): void {
    //iniciando
    this.usuario = {email: '', nome: '', senha: ''}
    //configura formulario
    this.fgLoginForm = this.fbLoginForm.group({
      email: new FormControl (this.usuario.email, [
        Validators.required,    //obrigatorio
        Validators.email,   //validacoes de email
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')   //formato obrigatorio do dado: ____@____.____
      ]),
      senha: new FormControl (this.usuario.senha, [
        Validators.required,
        Validators.minLength(8)   //tamanho minimo da senha
      ])
    });
  }

  get getEmail() {
    return this.fgLoginForm.get('email');
  }
  get getSenha() {
    return this.fgLoginForm.get('senha');
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

  enviaLogin(): void {
    //---------
    if (this.validaDados()) {
      //atualiza objeto
      this.usuario.email = this.getEmail?.value
      this.usuario.senha = this.getSenha?.value
      //--------------------------------------
      console.log('usuario: ' + this.usuario)
      //reseta variaveis controle
      this.usuario = {email: '', nome: '', senha: ''}
      this.flgSubmit = false
      this.fgLoginForm.reset()    //reseta formulario
    }
  }
  //#endregion
}
