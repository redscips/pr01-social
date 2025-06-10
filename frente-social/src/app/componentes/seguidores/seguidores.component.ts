import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seguidores',
  imports: [],
  templateUrl: './seguidores.component.html',
  styleUrl: './seguidores.component.scss'
})
export class SeguidoresComponent {
  //#region propriedades
  @Input() strNome: string = 'fulano'
  //#endregion
}
