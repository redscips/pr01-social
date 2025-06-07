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

  constructor (
    private socialAPI: ClsSocialAPIService
    //@Inject(PLATFORM_ID) private plataformaID: any
  ) { }

  //#region eventos: classe
  ngOnInit(): void { this.preparaForm() }
  //#endregion

  //#region metodos
  preparaForm(): void {
    //forca redesenhar as paginas: p/ evitar de aparecer o flash/imagem fantasma
    // do componente na memoria anterior a algum evento de recarga
    //if (isPlatformBrowser(this.plataformaID))
    //document.body.offsetHeight;   //gatilho reflow

    //configura o token p/ acessa
    this.socialAPI.validaToken()
  }
  //#endregion
}
