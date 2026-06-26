import { useState } from "react";
import "./BaixaFicha.css";
import { BuscarItem, BuscarPrestador, BaixarFichaAPI } from "../../services/rotas_api.jsx";

export default function BaixarFicha() {
  const [codigounico, setCodigounico] = useState("");
  const [idprestador, setIdPrestador] = useState("");
  const [prestador, setPrestador] = useState("");
  const [descricaoFicha, setDescricaoFicha] = useState("");
  const [valorItem, setValorItem] = useState(0);
  const [validacao, setValidacao] = useState([]);

  async function handleBuscarItem(e) {
    if (e.key !== "Enter") return;
    if (!codigounico) return;
    try {
      const retorno = await BuscarItem(codigounico);
      console.log(retorno);
      if (retorno?.VALIDACAO) {
        alert(retorno.VALIDACAO.MENSAGEM);
        return;
      }
      setDescricaoFicha(retorno.DESCRICAO);
      setValorItem(retorno.VALORTOTAL);

    } catch (err) {
      alert(err.message);
    }
  }

  async function handleBuscarPrestador(e) {
    if (e.key !== "Enter") return;
    if (!prestador) return;
    try {
      const retorno = await BuscarPrestador(prestador);
      console.log(retorno);
      if (Object.keys(retorno).length === 0) {
        alert("Prestador não encontrado");
        return;
      }
      setPrestador(retorno.NOME);
      setIdPrestador(retorno.IDPESSOA);

    } catch (err) {
      alert(err.message);
    }
  }

  async function handleBaixarFicha(e) {
    if (!codigounico) return;
    if (!idprestador) return;
    try {
      const retorno = await BaixarFichaAPI(codigounico, idprestador, validacao);
      console.log(retorno);
      if (retorno?.VALIDACAO) {
        alert(retorno.VALIDACAO.MENSAGEM);
        return;
      }
      alert("Ficha baixada com sucesso!");
      limparFormulario();

    } catch (err) {
      alert(err.message);
    }
  }

  function limparFormulario() {
    setCodigounico("");
    setIdPrestador("");
    setPrestador("");
    setDescricaoFicha("");
    setValorItem(0);
    setValidacao([]);
  }

  return (
    <div className="baixar-wrapper">
      <div className="container">
        <h1>Baixar Ficha</h1>

        <div className="input-box clean">
          <input
            placeholder="Código Único"
            type="text"
            inputMode="numeric"
            value={codigounico}
            onChange={(e) => setCodigounico(e.target.value.replace(/\D/g, ""))}
            onKeyDown={handleBuscarItem}
          />
        </div>

        <div className="dados-ficha">
          {descricaoFicha}
          <div className="valor-item">
            Valor: R$ {valorItem.toFixed(2)}
          </div>
        </div>

        <div className="input-box">
          <input
            placeholder="Usuario"
            type="text"
            name="Usuario"
            id="Usuario"
            inputMode="numeric"
            autoComplete="username"
            value={prestador}
            onChange={(e) => setPrestador(e.target.value.replace(/\D/g, ""))}
            onKeyDown={handleBuscarPrestador}
          />

          <i className="bx bx-user"></i>
        </div>

        <button type="submit" className="baixarficha" onClick={handleBaixarFicha}>
          Baixar Ficha
        </button>
      </div>
    </div>
  );
}