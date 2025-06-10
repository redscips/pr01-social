import { Component, Input } from '@angular/core';
import { tUsuario } from '../../tipos/comuns';

@Component({
  selector: 'app-seguidores',
  imports: [],
  templateUrl: './seguidores.component.html',
  styleUrl: './seguidores.component.scss'
})
export class SeguidoresComponent {
  //#region propriedades
  @Input() seguidores!: tUsuario[]
  //#endregion

  //#region eventos: classe
  ngOnInit(): void { this.preparaForm() }
  //#endregion

  //#region metodos
  preparaForm(): void {
    this.seguidores = [
      {
        cod_tab: 1,
        des_nome: 'fulano',
        des_url_img: 'https://picsum.photos/50/50'
      },
      {
        cod_tab: 2,
        des_nome: 'ciclano',
        des_url_img: 'https://picsum.photos/50/50'
      },
      {
        cod_tab: 3,
        des_nome: 'beltrano',
        des_url_img: 'https://picsum.photos/50/50'
      }
    ]
  }
  //#endregion
}
