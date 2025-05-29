import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  imports: [],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss'
})
export class CabecalhoComponent {
  @Input() nomeUsuario: string = ''
}
