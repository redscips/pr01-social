import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClsSocialAPIService } from './servicos/social_API/clsSocialAPI.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Rede Social';

  constructor (private socialAPI: ClsSocialAPIService) { }

  //#region eventos: classe
  ngOnInit(): void { this.preparaForm() }
  //#endregion

  //#region metodos
  preparaForm(): void {
    //configura o token p/ acessar
    this.socialAPI.validaToken()
  }
  //#endregion
}
