//campos de entrada: tipo de entradas mapeados
export type tTipoEntrada = 'text' | 'tel' | 'email' | 'password'

//login
export class tUsuario {
  constructor(
    public cod_tab?: number,
    public des_login?: string,
    public des_nome?: string,
    public des_senha?: string,
  ) {}
}

export type TokenResposta = {
  token: string
}

//posts
export type tPost = {
  id: number,
  strUrl?: string,
  strNome: string,
  strData?: Date,
  strMensagem: string,
  qtdGostei?: number,
  qtdNaoGostei?: number,
  comentarios?: tPost[]
}
