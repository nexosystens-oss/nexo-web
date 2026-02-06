import { useState, useEffect } from "react";
import "./Login.css";
import { FazerLogin } from "../../services/rotas_api.jsx";
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState(""); 
  const [cnpj, setCnpj] = useState("");
  const [usuariosSalvos, setUsuariosSalvos] = useState([]);
  const [cnpjsSalvos, setCnpjsSalvos] = useState([]);
  const [cnpjSalvo, setCnpjSalvo] = useState(null);

  const navigate = useNavigate()

  // Carrega histórico do cache
  useEffect(() => {
    const dadosUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuariosSalvos(dadosUsuarios);
    const dadosCnpjs = JSON.parse(localStorage.getItem("cnpjs")) || [];
    setCnpjsSalvos(dadosCnpjs);
    const cnpjStorage = localStorage.getItem("cnpj");
    if (cnpjStorage) {
      setCnpjSalvo(cnpjStorage);
      setCnpj(cnpjStorage);
    }
  }, []);

  const trocarEmpresa = () => {
    localStorage.removeItem("cnpj");
    setCnpj("");
    setCnpjSalvo(null);
  };

  async function handleLogin() {
    if (!usuario) return;

    let listaUsuarios = [...usuariosSalvos];
    if (!listaUsuarios.includes(usuario)) {
      listaUsuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
      setUsuariosSalvos(listaUsuarios);
    }

    let listaCnpjs = [...cnpjsSalvos];
    if (!listaCnpjs.includes(cnpj)) {
      listaCnpjs.push(cnpj);
      localStorage.setItem("cnpjs", JSON.stringify(listaCnpjs));
      setCnpjsSalvos(listaCnpjs);
    }

    //alert("Usuário salvo no cache!");

    try {
      const retorno = await FazerLogin(usuario, senha, cnpj);
      console.log(retorno);
      // salva o cnpj após sucesso
      localStorage.setItem("cnpj", cnpj);
      setCnpjSalvo(cnpj);
      //chamar outra pagina   
      console.log('Login OK, indo para baixa-ficha');
      navigate('/baixa-ficha');
      //alert("Login realizado com sucesso "+SESSAO.LOGIN);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="login-wrapper" >
      <div className="container">
        <h1>Login e Senha</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="Usuário"
            list="usuarios"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <datalist id="usuarios">
            {usuariosSalvos.map((u, i) => (
              <option key={i} value={u} />
            ))}
          </datalist>
          <i className="bx bx-user"></i>
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <i className="bx bx-lock-alt"></i>
        </div>

        {cnpjSalvo ? (
          <div>
            <p>
              Empresa: <strong>{cnpjSalvo}</strong>
              <label className="link-empresa" onClick={trocarEmpresa}>
                Trocar Empresa
              </label>
            </p>
          </div>
        ) : (
          <div className="input-box">
            <input
              type="text"
              placeholder="CNPJ"
              maxLength={18}
              list="cnpjs"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
            <datalist id="cnpjs">
              {cnpjsSalvos.map((u, i) => (
                <option key={i} value={u} />
              ))}
            </datalist>
            <i className="bx bx-id-card"></i>
          </div>
        )}
        <button className="login" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div >
  );
}
