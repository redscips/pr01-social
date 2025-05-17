import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClsComumService {
  //#region propriedades: estaticos
  static roteador: Router;
  //
  //#endregion

  constructor(private rotPrivado: Router) {
    ClsComumService.roteador = rotPrivado;
  }

  //#region
  //
  static navegar(rotas: string[]) {
    this.roteador.navigate(rotas)
  }
  //
  //#endregion
}
