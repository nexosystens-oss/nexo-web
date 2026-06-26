import { BASE_URL } from "./constantes.jsx";
import { SESSAO } from "./constantes.jsx";

export async function FazerLogin(usuario, senha, cnpj) {
  const response = await fetch(BASE_URL + "/usuario/logar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      LOGIN: usuario,
      SENHA: senha,
      CPFCNPJ: cnpj
    })
  });

  // se der erro HTTP
  if (!response.ok) {
    const erro = await response.text();
    throw new Error(erro || "Erro ao realizar login");
  }  
  
  // sucesso
  const data = await response.json();

  SESSAO.TOKEN_ACESS = data.TOKEN_JWT;
  SESSAO.LOGIN = data.LOGIN;
  SESSAO.CONTACAIXA = data.CONTACAIXA_NOME;
  SESSAO.CPFCNPJ = data.CPFCNPJEMPRESA;
  SESSAO.IDEMPRESAMATRIZ = data.IDEMPRESAMATRIZ;
  SESSAO.IDEMPRESA = data.IDEMPRESA;

  return data;
}

export async function BuscarItem(aIdCodigoUnico) { 

  const url = `${BASE_URL}/movimento/item/idunico?idcodigounico=${aIdCodigoUnico}&idempresamatriz=${SESSAO.IDEMPRESAMATRIZ}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${SESSAO.TOKEN_ACESS}`
      }
    });

    if (!response.ok) {
    const erro = await response.text();
    throw new Error(erro || "Erro ao buscar item");
    }  

    const data = await response.json();
    //console.log(data);

    return data;

  } catch (error) {
    console.error("Erro:", error);
  }
}

export async function BuscarPrestador(aIdPrestador) { 

  const url = `${BASE_URL}/pessoa/id?id=${aIdPrestador}&tipocadastro=1&idempresamatriz=${SESSAO.IDEMPRESAMATRIZ}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${SESSAO.TOKEN_ACESS}`
      }
    });

    if (!response.ok) {
    const erro = await response.text();
    throw new Error(erro || "Erro ao buscar Prestador");
    }  

    const data = await response.json(); 
    //console.log(data);

    return data;

  } catch (error) {
    console.error("Erro:", error);
  }
}

export async function BaixarFichaAPI(aIdCodigoUnico, aIdPrestador, aValidacao) {
  const response = await fetch(BASE_URL + "/movimento/baixaritem", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SESSAO.TOKEN_ACESS}`
    },
    body: JSON.stringify({
      IDCODIGOUNICO: aIdCodigoUnico,
      IDPESSOA: aIdPrestador,
      VALIDACAO: aValidacao,
      IDEMPRESAMATRIZ: SESSAO.IDEMPRESAMATRIZ,
      IDEMPRESA: SESSAO.IDEMPRESA 
    })
  });

  // se der erro HTTP
  if (!response.ok) {
    const erro = await response.text();
    throw new Error(erro || "Erro ao baixar Item");
  }  
  
  // sucesso
  const data = await response.json();

  console.log(data);

  return data;
}



