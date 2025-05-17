import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//importacoes: tipos
import { tUsuario } from '../../../tipos/comuns';
//componentes
import { CreEntradaComponent } from '../../cre-entrada/cre-entrada.component';
import { ClsSocialAPIService } from '../../../servicos/social_API/clsSocialAPI.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrar',
  imports: [CreEntradaComponent, ReactiveFormsModule],
  templateUrl: './entrar.component.html',
  styleUrl: './entrar.component.scss'
})
export class EntrarComponent implements OnInit {
  //#region propriedades
  fgLoginForm!: FormGroup;
  usuario!: tUsuario ;
  //#endregion

  flgSubmit: boolean = false;

  constructor(private fbLoginForm: FormBuilder, private socialAPI: ClsSocialAPIService, private roteador: Router) {}

  //#region eventos
  //classe
  ngOnInit(): void { this.preparaForm() }
  //objetos
  onSubmitForm(): void { this.enviaLogin() }
  onClick(): void { this.navegar() }
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
      // Atualiza os dados do formulário
      this.usuario.email = this.getEmail?.value;
      this.usuario.senha = this.getSenha?.value;
      // Efetua a requisição de login
      this.socialAPI.executaLogin(this.usuario.email, this.usuario.senha)
        .subscribe({
          next: () => {
            // Reseta os dados e o formulário
            this.usuario = { email: '', nome: '', senha: '' };
            this.flgSubmit = false;
            this.fgLoginForm.reset();
          },
          error: (erros) => {
            //validacoes
            if (erros.message.includes('already exists')) {
              //email duplicado
              this.fgLoginForm.get('email')?.setErrors({ emailDuplicado: true });
            }
          }
        })
    }
  }

  navegar() {
    this.roteador.navigate(['/login', 'cadastrar'])
  }
  //#endregion
}
