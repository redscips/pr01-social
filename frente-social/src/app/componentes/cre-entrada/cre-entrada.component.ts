import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
//importacoes: componentes angular
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
//tipos
import { tTipoEntrada } from '../../tipos/comuns';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-cre-entrada',
  imports: [FormsModule, NgClass, CommonModule],
  templateUrl: './cre-entrada.component.html',
  styleUrls: ['./cre-entrada.component.scss'],
  providers: [{
    //habilita a comunicacao p/ passagem de valores e sincronizacao com os pais em tempo de execucao
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CreEntradaComponent),
    multi: true
  }]
})
export class CreEntradaComponent implements ControlValueAccessor {
  //#region propriedades: entradas - recebem valores dos pais
  @Input() rEntrada: string = '';
  @Input() TipoEntrada: tTipoEntrada = 'text';
  @Input() strDescricao: string = '';
  @Input() strID: string = '';
  @Input() strClasse: string = '';
  @Input() flgSubmit: boolean = false;
  //controle exibicao de erros
  @Input() erros: ValidationErrors | undefined | null = null;

  //frases
  iEntrada: string = '';
  corInput: string = '#ccc'

  //saidas: retornam valores p/ seus pais
  @Output() siEntrada = new EventEmitter<string>();
  //#endregion

  //#region gets/sets: erros
  get getErros(): string[] {
    //retora o primeiro erro
    return this.erros
      ? Array.from(new Set(Object.keys(this.erros)))
        .filter((_, indice)=>indice === 0)
      : [];
  }
  //#endregion

  constructor() { }

  //#region eventos
  onInput(evento: Event): void { this.atualizaInput(evento) }

  //callbacks: interface ControlValueAccessor
  _onChange = (_: any) => {};
  //#endregion

  //#region metodos
  atualizaInput(evento: Event): void {
    const entrada = (evento.target as HTMLInputElement).value;
    //atualiza o campo localmente
    this.iEntrada = entrada;
    //retorna o valor p/ componente pai
    this.siEntrada.emit(entrada);
    //retorna o valor p/ componente pai
    this._onChange(entrada);
  }

  //interface
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  writeValue(obj: any): void { }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
  //#endregion
}

