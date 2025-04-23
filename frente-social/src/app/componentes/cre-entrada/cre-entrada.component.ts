import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
//importacoes: componentes angular
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
//tipos
import { tTipoEntrada } from '../../tipos/comuns';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-cre-entrada',
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './cre-entrada.component.html',
  styleUrl: './cre-entrada.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CreEntradaComponent),
    multi: true,
  }]
})
export class CreEntradaComponent implements ControlValueAccessor {
  //#region propriedades
  //inputs
  @Input() rEntrada: string = '';
  @Input() TipoEntrada: tTipoEntrada = 'text';
  @Input() strDescricao: string = '';
  @Input() strID: string = '';
  @Input() strClasse: string = '';
  @Input() flgSubmit: boolean = false;
  @Input() erros: Array<string>[] = []
  //#endregion

  iEntrada: string = '';

  //#region eventos
  //objetos
  onInput(evento: Event): void { this.atualizaInput(evento) }
  //callbacks
  _onChange: (value: any) => void = (_: any) => {};
  //#endregion

  //#region metodos
  atualizaInput(evento: Event): void {
    const entrada = (evento.target as HTMLInputElement).value;
    //atualiza o campo localmente
    this.iEntrada = entrada;
    //retorna o valor p/ componente pai
    this._onChange(entrada);
  }

  //interface
  writeValue(obj: any): void {
    this.iEntrada = obj;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
  //#endregion
}

