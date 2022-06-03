import "../../fonts/Inter/Inter-Black.ttf";
import "../../fonts/Inter/Inter-Bold.ttf";
import "../../fonts/Inter/Inter-ExtraBold.ttf";
import "../../fonts/Inter/Inter-ExtraLight.ttf";
import "../../fonts/Inter/Inter-Light.ttf";
import "../../fonts/Inter/Inter-Medium.ttf";
import "../../fonts/Inter/Inter-Regular.ttf";
import "../../fonts/Inter/Inter-SemiBold.ttf";
import "../../fonts/Inter/Inter-Thin.ttf";
import "./signin.scss";
import twitter from "../../images/twitter.svg";
import facebook from "../../images/facebook.svg";
import linkedin from "../../images/linkedin.svg";
import mail from "../../images/mail.svg";
import lock from "../../images/lock.svg";
import user from "../../images/user.svg";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Index() {
  const navigate = useNavigate()
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [erro, setErro] = useState();

  async function entrarClick() {
    const r = await axios.post('http://localhost:5000/usuario/cadastro', {
      nome: nome,
      email: email,
      senha: senha
    })
    if (r.status === 401) {
      setErro(r.data.erro);
    } else {
      navigate('/Login')
    }
  }

  return (
    <main>
      <body>
        <main>
          <section className="login-container">
            <div className="roxa">
              <div className="roxa-content">
                <h1 className="h1-roxa">Seja bem vindo!</h1>
                <p className="p-roxa">
                  Para se reconectar conosco, por favor coloque suas informações
                  de login!
                </p>
                <Link className="roxa-btn" to="/Login">
                  entrar
                </Link>
              </div>
            </div>
            <div className="branca">
              <div className="branca-content">
                <h1 className="h1-branca">Crie sua conta</h1>
                <div className="social">
                  <img src={twitter} width="42px" alt="twitter" />
                  <img src={facebook} width="42px" alt="facebook" />
                  <img src={linkedin} width="42px" alt="linkedin" />
                </div>
                <p className="p-branca">Ou use seu e-mail para se cadastrar</p>
                <div className="container-input">
                  <div className="email">
                    <img
                      src={user}
                      width="24px"
                      className="input-img"
                      alt="user"
                    ></img>
                    <input
                      type="text"
                      className="input-login"
                      placeholder="Nome"
                      value={nome} onChange={e => setNome(e.target.value)}
                    ></input>
                  </div>
                  <div className="email">
                    <img
                      src={mail}
                      width="24px"
                      className="input-img"
                      alt="mail"
                    ></img>
                    <input
                      type="email"
                      className="input-login"
                      placeholder="E-mail"
                      value={email} onChange={e => setEmail(e.target.value)}
                    ></input>
                  </div>
                  <div className="email">
                    <img
                      src={lock}
                      width="24px"
                      className="input-img"
                      alt="lock"
                    ></img>
                    <input
                      type="password"
                      className="input-login"
                      placeholder="Senha"
                      value={senha} onChange={e => setSenha(e.target.value)}
                    ></input>
                  </div>
                  <button className="branca-btn" onClick={entrarClick}>
                    cadastrar
                  </button>
                  <div className="errologin">
                    {erro}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </body>
    </main>
  );
}