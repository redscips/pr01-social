import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from '../../cabecalho/cabecalho.component';
import { RodapeComponent } from '../../rodape/rodape.component';
import { CommonModule } from '@angular/common';
import { criarAnimacao } from '../../../animacoes/animacoes';
import { ListaPostsComponent } from '../../lista-posts/lista-posts.component';
import { ClsComumService } from '../../../servicos/cls-comum.service';
import { SeguidoresComponent } from '../../seguidores/seguidores.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClsSocialAPIService } from '../../../servicos/social_API/clsSocialAPI.service';

@Component({
  selector: 'app-inicial',
  imports: [CabecalhoComponent, RodapeComponent, CommonModule, ListaPostsComponent, SeguidoresComponent, ReactiveFormsModule],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.scss',
  animations: [criarAnimacao('A', 'aparecer', ':enter')]
})
export class InicialComponent implements AfterViewInit, OnInit {
  //#region propriedade
  idBarra: string = 'id-barra-lateral'
  IDNavbar: string = ''
  strComentario: string = ''

  flg: boolean = false
  flgSubmit: boolean = false

  form!: FormGroup

  bsModal!: any;
  //#endregion

  constructor (
    private clsComum: ClsComumService,
    private formConstrutor: FormBuilder,
    private socialAPI: ClsSocialAPIService
  ) {}

  //#region gets/sets
  get getComentario() {
    return this.form.get('comentario')?.value
  }

  get getErros(): string[] {
    //retora o primeiro erro
    return this.form.get('comentarios')?.errors
      ? Array.from(new Set(Object.keys(this)))
        .filter((_, indice)=>indice === 0)
      : [];
  }
  //#endregion

  //#region eventos
  ngOnInit(): void { this.preparaComponente() }
  ngAfterViewInit(): void { this.ativaScroll() }
  onSubmit(): void { this.criarNovoPost() }
  retornaID(id: string): void { this.IDNavbar = id }
  //#endregion

  //#region metodos
  preparaComponente(): void {
    //cria formulario reativo
    this.form = this.formConstrutor.group({
      comentario: new FormControl(this.strComentario, [
        Validators.required   //campo obrigatorio
      ])
    })
  }

  ativaScroll(): void {
    //valida se o codigo esta neste momento esta rodando no navegador e nao no servidor
    if (this.clsComum.validaDOM()) {
      //assume que o bundle do bootstrap ja esta disponível globalmente: carrega funcoes bootstrao
      const bs = this.clsComum.retornaBootstrap()
      if (bs) {

        //retorna scroll
        const scroll = document.querySelector('[data-bs-spy="scroll"]')
        const intancia = bs.ScrollSpy.getOrCreateInstance(scroll!, {
          target: '#' + this.IDNavbar
        });
        //efetua refresh do comportamento do bootstrap
        intancia.refresh();

        //retorna modal
        const modal = document.querySelector('#id-modal')
        this.bsModal = bs.Modal.getOrCreateInstance(modal!, { backdrop: 'static' });
      }
    }
  }

  validaDados(): boolean {
    this.flgSubmit = true
    //retorna se o formulario esta valido
    return this.form.valid
  }

  criarNovoPost(): void {
    //valida se o formulario esta valido
    if (this.validaDados()) {
      //comentario
      this.strComentario = this.getComentario

      //valida se objeto bootstrap foi encontrado
      if (this.bsModal)
        //fecha modal
        this.bsModal.hide();

      //comunicacao com o oculto/django: cria novo post
      this.socialAPI.criarPost()
        .subscribe({
          next: (reposta) => {},
          error: (erros) => {
            //validacoes
            if (erros.message)
              this.form.get('comentario')?.setErrors({ erros: erros.message });
          }
        })
    }
   }
  //#endregion
}
