import "./LadingPage.scss";
import "./fonts/Inter/Inter-Black.ttf";
import "./fonts/Inter/Inter-Bold.ttf";
import "./fonts/Inter/Inter-ExtraBold.ttf";
import "./fonts/Inter/Inter-ExtraLight.ttf";
import "./fonts/Inter/Inter-Light.ttf";
import "./fonts/Inter/Inter-Medium.ttf";
import "./fonts/Inter/Inter-Regular.ttf";
import "./fonts/Inter/Inter-SemiBold.ttf";
import "./fonts/Inter/Inter-Thin.ttf";
import maonopc from "./images/maozinha no pc.png";
import localizacao from "./images/localizacao.png";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { enviarEmail } from "./api/usuarioApi.js";
import { useState } from "react";
function App() {
	const [Erro, setErro] = useState();
	const [carregando, setCarregando] = useState(false);
	const [nome, setNome] = useState();
	const [Email, setEmail] = useState();
	const [Assunto, setAssunto] = useState();
	const [Texto, setTexto] = useState();

	async function emailLancado() {
		setCarregando(true);
		try {
			const resp = await enviarEmail(nome, Email, Assunto, Texto);
			toast.success("Email enviado com sucesso!", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setNome("");
			setEmail("");
			setAssunto("");
			setTexto("");
		} catch (err) {
			setCarregando(false);
			if (err.response.status === 401) setErro(err.response.data.erro);
		}
	}

	return (
		<div>
			<ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
			<header class="landing-header">
				<section className="btn-content">
					<p className="title">FLUX</p>
					<a href="#saibamais" class="c-botao2" onClick={() => scroll.scrollTo(850)}>
						Saiba mais
					</a>
					<a href="#formulario-app" class="c-botao2" onClick={() => scroll.scrollTo(2450)}>
						Contato
					</a>
					<Link to="/login" className="c-botao3">
						FA??A SEU LOGIN
					</Link>
				</section>
			</header>
			<body>
				<section class="primeiro-container">
					<div class="c1-textos">
						<h1 class="titulo-1">Venda e compra de produtos com facilidade</h1>
						<p class="texto-1">
							Venda e compre m??veis, perif??ricos, utens??lios de cozinha e tudo o que quiser. Voc?? acha com facilidade pessoas vendendo ou comprando produtos do seu interesse.
						</p>
						<Link to="/Cadastro" className="botao-anunciar">
							COME??AR AGORA
						</Link>
					</div>
					<div>
						<img src={maonopc} className="c1-imagem"></img>
					</div>
				</section>

				<section id="saibamais">
					<h1 class="titulosaibamais">Saiba mais</h1>
					<p class="textosaibamais">Saiba um pouco mais do jeito que trabalhamos.</p>
				</section>
				
				<section class="quadradaos">
					<button class="quadrados">
						<h1 class="tituloquadrados">An??ncios</h1>
						<span class="textosquadrados">
							Veja an??ncios baseados em suas buscas e tamb??m em sua localiza????o, assim poder??s encontrar tudo aquilo que procura o mais perto de voc??. Desta forma voc?? evita passar muito
							tempo rolando o feed at?? achar algo que o interesse.
						</span>
					</button>
					<button class="quadrados">
						<h1 class="tituloquadrados">Seguran??a</h1>
						<span class="textosquadrados">
							Cada vez que voc?? avalia algu??m ou deixa uma cr??tica construtiva, o nosso sistema evita exibir an??ncios desta pessoa, assim voc?? tem menos chances de ser prejudicado no
							nosso site.
						</span>
					</button>
					<button class="quadrados">
						<span class="tituloquadrados"> Vendas </span>
						<span class="textosquadrados">N??s n??o interferimos na sua venda, somos apenas a ponte entre o anunciante e o comprador. N??o nos responsabilizamos por golpes ou roubos.</span>
					</button>
				</section>

				<section class="localizacao">
					<div>
						<img src={localizacao} className="imagemlocalizacao"></img>
					</div>
					<div class="localizacaocontainer">
						<h1 class="titulolocalizacao">Compre de qualquer lugar do Brasil</h1>
						<p class="textolocalizacao">Fa??a seu primeiro contato independente do seu local, venha dar uma olhada no que est??o anunciando no momento!</p>
						<Link class="botao-anunciar" to="/feed">
							FEED
						</Link>
					</div>
				</section>

				<section class="ultimo">
					<div class="parteroxa">
						<div>
							<h1 class="ultimos-titulos">LOCALIZA????O</h1>
							<p class="ultimos-textos">Rua Adelle n?? 95 apto: 234</p>
							<h1 class="ultimos-titulos">TELEFONES</h1>
							<p class="ultimos-textos">5816-5224 5812-5294</p>
							<h1 class="ultimos-titulos">HOR??RIOS DE ATENDIMENTO</h1>
							<p class="ultimos-textos">Segunda ?? sexta: 9h ??s 18h. Finais de semana e feriados: 9h ??s 12h.</p>
						</div>
					</div>

					<div id="formulario-app">
						<div className="fomulariocontainer">
							<h1 class="ultimotitulo">Formul??rio para contato</h1>
							<p class="ultimostext">Nome</p>
							<input type="text" class="form-input-app " value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Insira um nome (n??o obrigat??rio)"></input>
							<p class="ultimostext">E-mail</p>
							<input type="email" class="form-input-app" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Insira seu Email"></input>
							<p class="ultimostext">Assunto</p>
							<input type="text" class="form-input-app" value={Assunto} onChange={(e) => setAssunto(e.target.value)} placeholder="Informe o Assunto do formul??rio"></input>
							<p class="ultimostext">Mensagem</p>
							<textarea
								class="messageinput"
								rows={10}
								cols={70}
								value={Texto}
								onChange={(e) => setTexto(e.target.value)}
								placeholder="Insira as informa????es do seu formul??rio"></textarea>
							<div className="btn-form-div">
								<button className="c-botao3-form" onClick={emailLancado} disabled={carregando}>
									ENVIAR
								</button>
							</div>
							<div className="erroladingpage">{Erro}</div>
						</div>
					</div>
				</section>

				<section class="rodape">
					<p class="rodapebutton">FLUX</p>
					<div>
						<p class="direitosautorais">?? 2022 The Flux Company, all rights reserved</p>
					</div>
				</section>
			</body>
		</div>
	);
}

export default App;
