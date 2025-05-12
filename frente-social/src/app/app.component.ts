import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutenticacaoAPIService } from './servicos/autenticacao-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Rede Social';

  constructor (private autentica: AutenticacaoAPIService) {}

  //#region eventos
  //classe
  ngOnInit(): void { this.preparaForm() }
  //#endregion
  //
  //#region metodos
  preparaForm(): void {
    //configura o token p/ acessar
    this.autentica.executaLoginToken()
  }
  //#endregion
}
