import { animate, AnimationTriggerMetadata, style, transition, trigger } from "@angular/animations";

//animacoes
export function criarAnimacao(
  tipo: string,
  gatilho: string,
  evento: string,
  distancia: string = '30px',
  duracao: string = '1s',
  efeito: string = 'ease-in-out'
): AnimationTriggerMetadata {
  //variavel
  let animacao: any

  //verifica opcao passada
  switch (tipo) {
    default:
      //animacao de aparecer
      animacao = trigger(gatilho, [
        //define a transicao quando o elemento eh inserido no DOM
        transition(evento, [
          style({
            opacity: 0,
            transform: `translateY(${distancia})`
          }), //estado inicial
          animate(`${duracao} ${efeito}`,
            style({
              opacity: 1,
              transform: 'translateY(0)'
            })) //estado final
        ])
      ])
  }

  //retorno: animacao desejada
  return animacao
}
