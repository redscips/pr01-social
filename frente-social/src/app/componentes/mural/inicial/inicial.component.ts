import { Component, CUSTOM_ELEMENTS_SCHEMA, HostBinding  } from '@angular/core';
import { CabecalhoComponent } from '../../cabecalho/cabecalho.component';
import { RodapeComponent } from '../../rodape/rodape.component';
import { trigger, transition, style, animate } from '@angular/animations'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicial',
  imports: [CabecalhoComponent, RodapeComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.scss',
  animations: [
    //gatilho p/ uma animacao
    trigger('aparecer', [
      //define a transicao quando o elemento eh inserido no DOM
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }), //estado inicial
        animate('1s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' })) //estado final
      ])
    ])
  ]
})
export class InicialComponent {

  //#region variaveis/instancias
  imagens: string[] = [
    '../../../../assets/imagens/oceano.jpg',
    '../../../../assets/imagens/rio.jpg',
    '../../../../assets/imagens/arvores.jpg',
    '../../../../assets/imagens/montanha.jpg',
    '../../../../assets/imagens/region.jpg'
  ];

  //numeros
  ImagemAtual: number = 0;
  tempo: number = 60000;
  //#endregion

  //#region gets/sets : backgroundImage
  //amarracao com hospedeiro
  @HostBinding('style.backgroundImage')
  get fundoImagem(): string {
    //retorna imagem do slide atual p/ o fundo do 'host'
    return `url(${this.imagens[this.ImagemAtual]})`;
  }
  //#endregion

  //#region eventos
  ngOnInit(): void { this.trocaImagemSlide() }
  //#endregion

  //#region metodos
  trocaImagemSlide() {
    //temporizador
    setInterval(() => {
      //passa p/ proxima imagem
      this.ImagemAtual = (this.ImagemAtual + 1) % this.imagens.length;
    }, this.tempo);   //troca de imagem a cada 5 segundos
  }
  //#endregion
}
