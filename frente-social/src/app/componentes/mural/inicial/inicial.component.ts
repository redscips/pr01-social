import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CabecalhoComponent } from '../../cabecalho/cabecalho.component';
import { RodapeComponent } from '../../rodape/rodape.component';
import { CommonModule } from '@angular/common';
import { criarAnimacao } from '../../../animacoes/animacoes';

@Component({
  selector: 'app-inicial',
  imports: [CabecalhoComponent, RodapeComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.scss',
  animations: [criarAnimacao('A', 'aparecer', ':enter')]
})
export class InicialComponent { }
