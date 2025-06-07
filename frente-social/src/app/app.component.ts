import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClsSocialAPIService } from './servicos/social_API/clsSocialAPI.service';
import { ClsComumService } from './servicos/cls-comum.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Rede Social';

  constructor (
    private socialAPI: ClsSocialAPIService,
    private clsComum: ClsComumService
  ) { }

  //#region eventos: classe
  ngOnInit(): void { this.preparaForm() }
  //#endregion

  //#region metodos
  preparaForm(): void {
    //valida se esta rodando codigo no navegador
    if (this.clsComum.validaDOM()) {
      //forca redesenhar as paginas: p/ evitar de aparecer o flash/imagem fantasma
      // do componente na memoria anterior a algum evento de recarga
      document.body.offsetHeight;   //gatilho reflow
    }

    //configura o token p/ acessa
    this.socialAPI.validaToken()
  }
  //#endregion
}
