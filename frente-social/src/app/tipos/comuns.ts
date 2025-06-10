//campos de entrada: tipo de entradas mapeados
export type tTipoEntrada = 'text' | 'tel' | 'email' | 'password'

//login
export type tUsuario = {
  cod_tab?: number
  des_nome?: string,
  des_login?: string,
  des_senha?: string,
  des_url_img?: string
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
  qtdNaoGostei?: number
}
