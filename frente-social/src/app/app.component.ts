import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ClsSocialAPIService } from './servicos/social_API/clsSocialAPI.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Rede Social';

  flgExibe = false;

  constructor (
    private socialAPI: ClsSocialAPIService,
    private roteador: Router,
    @Inject(PLATFORM_ID) private plataformaID: any
  ) { }

  //#region eventos: classe
  ngOnInit(): void { this.preparaForm() }
  //#endregion

  //#region metodos
  preparaForm(): void {
    //forca redesenhar as paginas: p/ evitar de aparecer o flash/imagem fantasma
    // do componente na memoria anterior a algum evento de recarga
    //if (isPlatformBrowser(this.plataformaID))
    document.body.offsetHeight;   //gatilho reflow

    //configura o token p/ acessa
    this.socialAPI.validaToken()

    // Só mostra conteúdo depois da primeira navegação completar
    this.roteador.events.subscribe(evento => {
      if (evento instanceof NavigationEnd) {
        // Pequeno delay para evitar flash
        setTimeout(() => {
          this.flgExibe = true;
        }, 50);
      }
    });
  }
  //#endregion
}
