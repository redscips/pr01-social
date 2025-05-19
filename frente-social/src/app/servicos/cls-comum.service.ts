import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClsComumService implements CanActivate {
  //#region propriedades: estaticos
  static roteador: Router;
  //estados
  static flgLogado: boolean;
  static estaLogado = 'estado_login'
  static plataformaIDEstatico: any
  //
  //#endregion

  constructor(private rotPrivado: Router, @Inject(PLATFORM_ID) private plataformaID: any) {
    //configura roteador
    ClsComumService.roteador = rotPrivado;
    //-----------
    ClsComumService.plataformaIDEstatico = this.plataformaID
    if (isPlatformBrowser(this.plataformaID)) {
      //setta variavel de acordo com armazenamento local : memoria
      ClsComumService.flgLogado = localStorage.getItem(ClsComumService.estaLogado) === 'verdadeiro';
    }
  }

  //#region interface
  //
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    //retorna se pode ou nao ativar a rota
    if (!ClsComumService.getFlgLogado) {
      //navega p/ rota de login
      ClsComumService.navegar(['/login'])
    }
    //def retorno
    return ClsComumService.getFlgLogado
  }
  //
  //#endregion

  //#region metodos
  //
  static navegar(rotas: string[]) {
    this.roteador.navigate(rotas)
  }

  static setFlgLogado(ctrl: boolean): void {
    this.flgLogado = ctrl
    //valida se esta no ambiente do navegador
    if (isPlatformBrowser(this.plataformaIDEstatico)) {
      localStorage.setItem(this.estaLogado, ctrl ? 'verdadeiro' : 'falso')
    }
  }

  static get getFlgLogado(): boolean {
    return this.flgLogado;
  }
  //
  //#endregion
}
