import { Component } from '@angular/core';
import { RaizEncapComponent } from '../../react/raiz/Raiz-encap.component';

@Component({
  selector: 'app-inicial',
  imports: [RaizEncapComponent],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.scss'
})
export class InicialComponent {

  onClick(): void { alert('voce clickou no botao') }
}
