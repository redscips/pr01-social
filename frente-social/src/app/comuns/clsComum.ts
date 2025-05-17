import { Router } from "@angular/router";

export class ClsComum {
  //propriedade
  static roteador: Router

  //#region
  //
  static navegar(rotas: string[]) {
    this.roteador.navigate(rotas)
  }
  //
  //#endregion
}
