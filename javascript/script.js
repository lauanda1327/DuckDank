document.getElementById('img').draggable = false//<- disabilitar arrasto da imagem
document.getElementById('duckpixels').draggable = false
document.getElementById('retry').style.display = "none"
document.getElementById('exit').style.display = "none"
document.getElementById('carta').style.display = "none"
document.getElementById('menuButton').style.display = "none"
let imagemDeInteracao = document.getElementById("imagemDeInteracao")
let buttonDown = document.getElementById("buttonDown")
let btn1 = document.querySelector('#btn1')
let btn2 = document.querySelector('#btn1')
let reiniciar = document.getElementById("retry")
let gameOverMsg = document.getElementById('gameOver')
let img = document.getElementById('img')//<- imagem do duck
let imgDuckPixels = document.getElementById('duckpixels');
let conjuntoCasa = document.querySelector('.container')//<-casas do tabuleiro 
let casa = []
let decisao
let VezDoJogador = 'MIN'//<-usuario inicial
let MIN = "X"
let MAX = "O"
let cont = 0
let repouso = false
let tempo = 0
let iniciarJogo = false
let vencedor
let andar = 0
let espera = 0
let tempoDeChamadaDuckPixels = [1,22,50,25,20,5,50,55,7,31,18,220,300,10,63,110,35,75,130,95,80,40,17,45,37,13,330,90,98,12,15,85,125]
let posicaoDeJogada = [0,2,6,8]//<-para o inicio do jogo
let velocidade = 10
let totalV  = localStorage.getItem('vitoria'); //<- contador de vitórias
let derrotaV = localStorage.getItem('derrota'); //<- contador de derrota  
let empateV = localStorage.getItem('empate'); //<- contador de empate
let ImagensInteracaoVitoria = [
"imagens/mitei.png",
"imagens/jogando.png",
"imagens/serio.png",
"imagens/sintilante.png",
"imagens/tonto.png",
"imagens/raiva.png",
"imagens/mitei.png",
"imagens/raivaintensa.png",
"imagens/mito.png",
"imagens/inspirado.png",
"imagens/inacreditavel.png",
"imagens/gameover.png",
"imagens/porpouco.png",
"imagens/branco.png",
]

let FrasesInteracaoVitoria = [
"Mitei...",
"Quak...Quak...",
"hA...hA...hA",
"XEQUE-MATE",
"O melhor Pato...",
"A vitória será sempre minha...",
"Não adianta tentar...",
"Vou nadar...",
"Vamos lá...você consegue mais que isso",
"Um pato...dois patos... três patos...",
"Patos também jogam jogo da velha",
"Um patinho no lago...",
"Essa foi por pouco...",
"A várias formas de vencer...você só não consegue descobrir...",
]
//definir um delay de tempo

const Sleep = (seconds) =>  {
    let tempo = seconds * 1000
    return new Promise(res => setTimeout(res, tempo))
}

function gerador(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function duckChamada(){
	espera = gerador(0,33);
	let aleatoria = gerador(1,4)
	//console.log(aleatoria)
	setInterval(function () {
		if(tempo === tempoDeChamadaDuckPixels[espera]){
			if(aleatoria == 1){
				duckPixels1()
			}
			else if(aleatoria == 2){
				duckPixels2()
			}
			else if(aleatoria == 3){
				duckPixels3()
			}
			else if(aleatoria == 4){
				duckPixels4()
			}
		}
	}, 1000);
}

function duckPixels1() {
let altura = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	setInterval(function () {
		if(andar < altura){
			andar = andar + velocidade
			imgDuckPixels.src = "imagens/Duckpixels.png"
			imgDuckPixels.style.top = andar + "px"
		}
		if(andar >= altura){
			imgDuckPixels.src = ""
		}
	}, 300);
}
function duckPixels2() {
	console.log('2')
	let altura = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	andar = altura - 15
	setInterval(function () {
		if(andar < altura && andar > 0){
			andar = andar - velocidade
			imgDuckPixels.src = "imagens/Duckpixels.png"
			imgDuckPixels.style.top = andar + "px"
		}
		if(andar <= 0){
			imgDuckPixels.src = ""
		}
	}, 300);
}
function duckPixels3() {
	let altura = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	let largura = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	andar = largura - 15
	let posicao =  gerador(10, altura - 10)

	imgDuckPixels.style.top = posicao + "px"
	setInterval(function () {
		if(andar < largura && andar > 0){
			andar = andar - velocidade//imagem trocar esquerda
			imgDuckPixels.src = "imagens/DuckpixelsInverso.png"
			imgDuckPixels.style.left = andar + "px"
		}
		if(andar <= 0){
			imgDuckPixels.src = ""
		}
	}, 300);
}
async function duckPixels4() {
	let altura = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	let largura = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	let posicao =  gerador(10, altura - 10)

	imgDuckPixels.style.top = posicao + "px"//gerar uma posição de entrada
	setInterval(function () {
		if(andar < largura){
			andar = andar + velocidade
			imgDuckPixels.src = "imagens/Duckpixels.png"
			imgDuckPixels.style.left = andar + "px"
		}
		if(andar >= largura){
			imgDuckPixels.src = ""
		}
	}, 300);
	
}

function cronometro() {
	setInterval(function () {
		tempo++;
	}, 1000);
}
async function piscando() {
	//faça enquanto o usuario não iniciar o jogo
	//piscando
	while(iniciarJogo == false){//enquanto contador for menor que 25 segundos
		img.src = "imagens/entediadoinicial.png"
    	await Sleep(0.25);
    	img.src = 'imagens/posicaoinicial.png'
		for(i = 0; i < 11; i++){
			if(iniciarJogo == false){
			await Sleep(0.5)
			}	
		}

	}
	while(iniciarJogo == true){//enquanto contador for menor que 25 segundos
		img.src = "imagens/entediado.png"
    	await Sleep(0.25);
    	img.src = 'imagens/jogando.png'
		await Sleep(5.5)
	}
}

function tabuleiro() {
	cont = 0
	for(i = 0; i < 9; i++){//criar tabuleiro
		casa[i] = document.createElement('div')
		conjuntoCasa.appendChild(casa[i])
		casa[i].setAttribute('class','bloco' + i)
		casa[i].setAttribute('onclick','iniciarJogo = true')
		casa[i].addEventListener('click',jogar)
		casa[i].style.color = "orange"
	}
}
function chamarCartaoDeTnteracao(){
	document.getElementById("carta").style.display = "flex"
	gameOverMsg.style.animation = "entrada 4s"
	gameOverMsg.style.display = "block"
	document.getElementById('carta').style.animation = "giro 5s"
	document.getElementById('retry').style.display = "block"
	document.getElementById('exit').style.display = "block"
	document.getElementById('menuButton').style.display = "block"
	//decidir a mensagem da carta
	decisao = gerador(0, 13)
	img.src =  ImagensInteracaoVitoria[decisao]
	imagemDeInteracao.src = ImagensInteracaoVitoria[decisao]
	document.getElementById('mensagemDeInteracao').innerHTML = FrasesInteracaoVitoria[decisao]
}
function verificar(){
	//verifica vitoria, derrota e empate
		//verificar casas para MIN
		if(casa[0].innerHTML == MIN && casa[1].innerHTML == MIN && casa[2].innerHTML == MIN){
			chamarCartaoDeTnteracao();
			vencedor = MIN
			totalV++;
			localStorage.setItem('vitoria', totalV)
			let vitoria = localStorage.getItem('vitoria');
			gameOverMsg.innerHTML = "You Win!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[0].style.color = "black"
			casa[1].style.color = "black"
			casa[2].style.color = "black"
		}
		else if(casa[3].innerHTML == MIN && casa[4].innerHTML == MIN && casa[5].innerHTML == MIN){
			chamarCartaoDeTnteracao();
			vencedor = MIN
			totalV++;
			localStorage.setItem('vitoria', totalV)
			let vitoria = localStorage.getItem('vitoria');
			gameOverMsg.innerHTML = "You Win!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[3].style.color = "black"
			casa[4].style.color = "black"
			casa[5].style.color = "black"
		}
		else if(casa[6].innerHTML == MIN && casa[7].innerHTML == MIN && casa[8].innerHTML == MIN){
			chamarCartaoDeTnteracao();
			vencedor = MIN
			totalV++;
			localStorage.setItem('vitoria', totalV)
			let vitoria = localStorage.getItem('vitoria');
			gameOverMsg.innerHTML = "You Win!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[6].style.color = "black"
			casa[7].style.color = "black"
			casa[8].style.color = "black"
		}
		else if(casa[0].innerHTML == MIN && casa[4].innerHTML == MIN && casa[8].innerHTML == MIN){
			chamarCartaoDeTnteracao();
			vencedor = MIN
			totalV++;
			localStorage.setItem('vitoria', totalV)
			let vitoria = localStorage.getItem('vitoria');
			gameOverMsg.innerHTML = "You Win!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[0].style.color = "black"
			casa[4].style.color = "black"
			casa[8].style.color = "black"
		}
		else if(casa[2].innerHTML == MIN && casa[4].innerHTML == MIN && casa[6].innerHTML == MIN){
			chamarCartaoDeTnteracao();
			vencedor = MIN
			totalV++;
			localStorage.setItem('vitoria', totalV)
			let vitoria = localStorage.getItem('vitoria');
			gameOverMsg.innerHTML = "You Win!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[2].style.color = "black"
			casa[4].style.color = "black"
			casa[6].style.color = "black"
		}
		else if(casa[0].innerHTML == MIN && casa[3].innerHTML == MIN && casa[6].innerHTML == MIN){
			chamarCartaoDeTnteracao();
			vencedor = MIN
			totalV++;
			localStorage.setItem('vitoria', totalV)
			let vitoria = localStorage.getItem('vitoria');
			gameOverMsg.innerHTML = "You Win!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[0].style.color = "black"
			casa[3].style.color = "black"
			casa[6].style.color = "black"
		}
		else if(casa[1].innerHTML == MIN && casa[4].innerHTML == MIN && casa[7].innerHTML == MIN){
			chamarCartaoDeTnteracao();
			vencedor = MIN
			totalV++;
			localStorage.setItem('vitoria', totalV)
			let vitoria = localStorage.getItem('vitoria');
			gameOverMsg.innerHTML = "You Win!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[1].style.color = "black"
			casa[4].style.color = "black"
			casa[7].style.color = "black"
		}
		else if(casa[2].innerHTML == MIN && casa[5].innerHTML == MIN && casa[8].innerHTML == MIN){
			chamarCartaoDeTnteracao();
			vencedor = MIN
			totalV++;
			localStorage.setItem('vitoria', totalV)
			let vitoria = localStorage.getItem('vitoria');
			gameOverMsg.innerHTML = "You Win!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[2].style.color = "black"
			casa[5].style.color = "black"
			casa[8].style.color = "black"
		}

		//verificar casas para MAX
		else if(casa[0].innerHTML == MAX && casa[1].innerHTML == MAX && casa[2].innerHTML == MAX){
			chamarCartaoDeTnteracao();
			vencedor = MAX
			derrotaV++;
			localStorage.setItem('derrota', derrotaV)
			let derrota = localStorage.getItem('derrota');
			gameOverMsg.innerHTML = "Game Over!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[0].style.color = "black"
			casa[1].style.color = "black"
			casa[2].style.color = "black"
		}
		else if(casa[3].innerHTML == MAX && casa[4].innerHTML == MAX && casa[5].innerHTML == MAX){
			chamarCartaoDeTnteracao();
			vencedor = MAX
			derrotaV++;
			localStorage.setItem('derrota', derrotaV)
			let derrota = localStorage.getItem('derrota');
			gameOverMsg.innerHTML = "Game Over!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[3].style.color = "black"
			casa[4].style.color = "black"
			casa[5].style.color = "black"
		}
		else if(casa[6].innerHTML == MAX && casa[7].innerHTML == MAX && casa[8].innerHTML == MAX){
			chamarCartaoDeTnteracao();
			vencedor = MAX
			derrotaV++;
			localStorage.setItem('derrota', derrotaV)
			let derrota = localStorage.getItem('derrota');
			gameOverMsg.innerHTML = "Game Over!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[6].style.color = "black"
			casa[7].style.color = "black"
			casa[8].style.color = "black"
		}
		else if(casa[0].innerHTML == MAX && casa[4].innerHTML == MAX && casa[8].innerHTML == MAX){
			chamarCartaoDeTnteracao();
			vencedor = MAX
			derrotaV++;
			localStorage.setItem('derrota', derrotaV)
			let derrota = localStorage.getItem('derrota');
			gameOverMsg.innerHTML = "Game Over!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[0].style.color = "black"
			casa[4].style.color = "black"
			casa[8].style.color = "black"
		}
		else if(casa[2].innerHTML == MAX && casa[4].innerHTML == MAX && casa[6].innerHTML == MAX){
			chamarCartaoDeTnteracao();
			vencedor = MAX
			derrotaV++;
			localStorage.setItem('derrota', derrotaV)
			let derrota = localStorage.getItem('derrota');
			gameOverMsg.innerHTML = "Game Over!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[2].style.color = "black"
			casa[4].style.color = "black"
			casa[6].style.color = "black"
		}
		else if(casa[0].innerHTML == MAX && casa[3].innerHTML == MAX && casa[6].innerHTML == MAX){
			chamarCartaoDeTnteracao();
			vencedor = MAX
			derrotaV++;
			localStorage.setItem('derrota', derrotaV)
			let derrota = localStorage.getItem('derrota');
			gameOverMsg.innerHTML = "Game Over!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[0].style.color = "black"
			casa[3].style.color = "black"
			casa[6].style.color = "black"
		}
		else if(casa[1].innerHTML == MAX && casa[4].innerHTML == MAX && casa[7].innerHTML == MAX){
			chamarCartaoDeTnteracao();
			vencedor = MAX
			derrotaV++;
			localStorage.setItem('derrota', derrotaV)
			let derrota = localStorage.getItem('derrota');
			gameOverMsg.innerHTML = "Game Over!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[1].style.color = "black"
			casa[4].style.color = "black"
			casa[7].style.color = "black"
		}
		else if(casa[2].innerHTML == MAX && casa[5].innerHTML == MAX && casa[8].innerHTML == MAX){
			chamarCartaoDeTnteracao();
			vencedor = MAX
			derrotaV++;
			localStorage.setItem('derrota', derrotaV)
			let derrota = localStorage.getItem('derrota');
			gameOverMsg.innerHTML = "Game Over!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
			casa[2].style.color = "black"
			casa[5].style.color = "black"
			casa[8].style.color = "black"
		}
		//verificar empate
		else if((cont == 9) && (vencedor != MIN || vencedor != MAX)){
			chamarCartaoDeTnteracao();
			empateV++;
			localStorage.setItem('empate', empateV)
			let empate = localStorage.getItem('empate');
			gameOverMsg.innerHTML = "Empate!!"
			conjuntoCasa.style.opacity = "0.45"
			img.style.opacity = "0.45"
		}
}

function duckDankJogar(){
	//jogada inicial
	//se MIN jogar no meio, escolha os cantos
	if(casa[4].innerHTML == MIN && cont == 1){
		let receber = Math.floor(Math.random() * 4);
		casa[posicaoDeJogada[receber]].innerHTML = MAX
		casa[posicaoDeJogada[receber]].removeEventListener('click',jogar)
		VezDoJogador = 'MIN'
		cont++
	}
	//se MIN jogar nos cantos, escolha o meio
	else if((casa[0].innerHTML == MIN || casa[2].innerHTML == MIN || casa[6].innerHTML == MIN || casa[8].innerHTML == MIN) && cont == 1){
		casa[4].innerHTML = MAX
		casa[4].removeEventListener('click',jogar)
		VezDoJogador = 'MIN'
		cont++
	}
	//escolher uma casa aleatória que esteja vazia
	else if((casa[1].innerHTML == MIN || casa[3].innerHTML == MIN || casa[5].innerHTML == MIN || casa[7].innerHTML == MIN) && cont == 1){
		let escolhaCasa = Math.floor(Math.random() * 9);
		if(casa[escolhaCasa].innerHTML == ""){
			casa[escolhaCasa].innerHTML = MAX
			casa[escolhaCasa].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}else{
			duckDankJogar()
		}
	}
	else if(cont > 2 && VezDoJogador == 'MAX'){
		//VERIFICAR JOGADA DE ATAQUE DE 'MIN' E POSSÍVEL VITÓRIA DE 'MAX'
		//primeira linha horizontal
		if((casa[0].innerHTML == MIN && casa[1].innerHTML == MIN || casa[0].innerHTML == MAX && casa[1].innerHTML == MAX)&& casa[2].innerHTML == ""){
			casa[2].innerHTML = MAX
			casa[2].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[1].innerHTML == MIN && casa[2].innerHTML == MIN || casa[1].innerHTML == MAX && casa[2].innerHTML == MAX)&& casa[0].innerHTML == ""){
			casa[0].innerHTML = MAX
			casa[0].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[0].innerHTML == MIN && casa[2].innerHTML == MIN || casa[0].innerHTML == MAX && casa[2].innerHTML == MAX)&& casa[1].innerHTML == ""){
			casa[1].innerHTML = MAX
			casa[1].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		//segunda linha horizontal
		else if((casa[3].innerHTML == MIN && casa[4].innerHTML == MIN || casa[3].innerHTML == MAX && casa[4].innerHTML == MAX)&& casa[5].innerHTML == ""){
			casa[5].innerHTML = MAX
			casa[5].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[4].innerHTML == MIN && casa[5].innerHTML == MIN || casa[4].innerHTML == MAX && casa[5].innerHTML == MAX)&& casa[3].innerHTML == ""){
			casa[3].innerHTML = MAX
			casa[3].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[3].innerHTML == MIN && casa[5].innerHTML == MIN || casa[3].innerHTML == MAX && casa[5].innerHTML == MAX)&& casa[4].innerHTML == ""){
			casa[4].innerHTML = MAX
			casa[4].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		//terceira linha horizontal
		else if((casa[6].innerHTML == MIN && casa[7].innerHTML == MIN || casa[6].innerHTML == MAX && casa[7].innerHTML == MAX)&& casa[8].innerHTML == ""){
			casa[8].innerHTML = MAX
			casa[8].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[7].innerHTML == MIN && casa[8].innerHTML == MIN || casa[7].innerHTML == MAX && casa[8].innerHTML == MAX)&& casa[6].innerHTML == ""){
			casa[6].innerHTML = MAX
			casa[6].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[6].innerHTML == MIN && casa[8].innerHTML == MIN || casa[6].innerHTML == MAX && casa[8].innerHTML == MAX)&& casa[7].innerHTML == ""){
			casa[7].innerHTML = MAX
			casa[7].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		//primeira coluna vertical
		else if((casa[0].innerHTML == MIN && casa[3].innerHTML == MIN || casa[0].innerHTML == MAX && casa[3].innerHTML == MAX)&& casa[6].innerHTML == ""){
			casa[6].innerHTML = MAX
			casa[6].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[0].innerHTML == MIN && casa[6].innerHTML == MIN || casa[0].innerHTML == MAX && casa[6].innerHTML == MAX)&& casa[3].innerHTML == ""){
			casa[3].innerHTML = MAX
			casa[3].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[3].innerHTML == MIN && casa[6].innerHTML == MIN || casa[3].innerHTML == MAX && casa[6].innerHTML == MAX)&& casa[0].innerHTML == ""){
			casa[0].innerHTML = MAX
			casa[0].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		//segunda coluna vertical
		else if((casa[1].innerHTML == MIN && casa[4].innerHTML == MIN || casa[1].innerHTML == MAX && casa[4].innerHTML == MAX)&& casa[7].innerHTML == ""){
			casa[7].innerHTML = MAX
			casa[7].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[1].innerHTML == MIN && casa[7].innerHTML == MIN || casa[1].innerHTML == MAX && casa[7].innerHTML == MAX)&& casa[4].innerHTML == ""){
			casa[4].innerHTML = MAX
			casa[4].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[4].innerHTML == MIN && casa[7].innerHTML == MIN || casa[4].innerHTML == MAX && casa[7].innerHTML == MAX)&& casa[1].innerHTML == ""){
			casa[1].innerHTML = MAX
			casa[1].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		//terceira coluna vertical
		else if((casa[2].innerHTML == MIN && casa[5].innerHTML == MIN || casa[2].innerHTML == MAX && casa[5].innerHTML == MAX)&& casa[8].innerHTML == ""){
			casa[8].innerHTML = MAX
			casa[8].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[2].innerHTML == MIN && casa[8].innerHTML == MIN || casa[2].innerHTML == MAX && casa[8].innerHTML == MAX)&& casa[5].innerHTML == ""){
			casa[5].innerHTML = MAX
			casa[5].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[5].innerHTML == MIN && casa[8].innerHTML == MIN || casa[5].innerHTML == MAX && casa[8].innerHTML == MAX)&& casa[2].innerHTML == ""){
			casa[2].innerHTML = MAX
			casa[2].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		//diagonal
		else if((casa[0].innerHTML == MIN && casa[4].innerHTML == MIN || casa[0].innerHTML == MAX && casa[4].innerHTML == MAX)&& casa[8].innerHTML == ""){
			casa[8].innerHTML = MAX
			casa[8].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[0].innerHTML == MIN && casa[8].innerHTML == MIN || casa[0].innerHTML == MAX && casa[8].innerHTML == MAX)&& casa[4].innerHTML == ""){
			casa[4].innerHTML = MAX
			casa[4].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[4].innerHTML == MIN && casa[8].innerHTML == MIN || casa[4].innerHTML == MAX && casa[8].innerHTML == MAX)&& casa[0].innerHTML == ""){
			casa[0].innerHTML = MAX
			casa[0].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[2].innerHTML == MIN && casa[4].innerHTML == MIN || casa[2].innerHTML == MAX && casa[4].innerHTML == MAX)&& casa[6].innerHTML == ""){
			casa[6].innerHTML = MAX
			casa[6].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[2].innerHTML == MIN && casa[6].innerHTML == MIN || casa[2].innerHTML == MAX && casa[6].innerHTML == MAX)&& casa[4].innerHTML == ""){
			casa[4].innerHTML = MAX
			casa[4].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if((casa[4].innerHTML == MIN && casa[6].innerHTML == MIN || casa[4].innerHTML == MAX && casa[6].innerHTML == MAX)&& casa[2].innerHTML == ""){
			casa[2].innerHTML = MAX
			casa[2].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		//verificar as pontas
		else if(casa[0].innerHTML == MIN && casa[8].innerHTML == MIN && casa[1].innerHTML == ""){
			casa[1].innerHTML = MAX
			casa[1].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if(casa[0].innerHTML == MIN && casa[8].innerHTML == MIN && casa[5].innerHTML == ""){
			casa[5].innerHTML = MAX
			casa[5].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if(casa[0].innerHTML == MIN && casa[8].innerHTML == MIN && casa[3].innerHTML == ""){
			casa[3].innerHTML = MAX
			casa[3].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if(casa[0].innerHTML == MIN && casa[8].innerHTML == MIN && casa[7].innerHTML == ""){
			casa[7].innerHTML = MAX
			casa[7].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}


		else if(casa[2].innerHTML == MIN && casa[6].innerHTML == MIN && casa[1].innerHTML == ""){
			casa[1].innerHTML = MAX
			casa[1].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if(casa[2].innerHTML == MIN && casa[6].innerHTML == MIN && casa[5].innerHTML == ""){
			casa[5].innerHTML = MAX
			casa[5].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if(casa[2].innerHTML == MIN && casa[6].innerHTML == MIN && casa[3].innerHTML == ""){
			casa[3].innerHTML = MAX
			casa[3].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else if(casa[2].innerHTML == MIN && casa[6].innerHTML == MIN && casa[7].innerHTML == ""){
			casa[7].innerHTML = MAX
			casa[7].removeEventListener('click',jogar)
			cont++
			VezDoJogador = 'MIN'
		}
			//trecho de código pequeno
		else if(casa[5].innerHTML == MIN && casa[7].innerHTML == MIN && casa[8].innerHTML == ""){
			casa[8].innerHTML = MAX
			casa[8].removeEventListener('click',jogar)
			VezDoJogador = 'MIN'
			cont++
		}
		else{
			if(cont != 9){
				let escolhaCasa = Math.floor(Math.random() * 9);
				//escolher uma casa aleatória que esteja vazia
				if(casa[escolhaCasa].innerHTML == ""){
					casa[escolhaCasa].innerHTML = MAX
					casa[escolhaCasa].removeEventListener('click',jogar)
					VezDoJogador = 'MIN'
					cont++
				}else{
					duckDankJogar()
				}
				
			}
		}
	}
	const audio = new Audio('audio/cool.wav');
	audio.play();
}
function tempoEscolha() {
	let x = gerador(0,13)
	img.src = ImagensInteracaoVitoria[x]
	return gerador(0,0.5);//entre 0 e 1
}

async function jogar(e) {
	//verifica de quem é a vez
	if(VezDoJogador == 'MIN'){
		e.target.innerHTML = MIN
		//Não permite jogar no bloco do oponente
		e.target.removeEventListener('click',jogar)
		//Passa a vez pro jogador MAX
		VezDoJogador = 'MAX'
		cont++
		
	}
	let tempoDeReacao = tempoEscolha()
	await Sleep(tempoDeReacao)
	duckDankJogar()
	verificar()
}
reiniciar.addEventListener('click', () => {
	//audio
	const audio = new Audio('audio/tap.wav');
	audio.play();
	//deletar a carta de interação e seus componentes
	document.getElementById('retry').style.display = "none"
	document.getElementById('exit').style.display = "none"
	document.getElementById('carta').style.display = "none"
	document.getElementById('menuButton').style.display = "none"
	gameOverMsg.style.display = "none"
	conjuntoCasa.style.opacity = "1"
	img.style.opacity = "1"
	//deletar o tabuleiro

	for(let i = 0; i < 9; i++){
		casa[i].innerHTML = ""
		casa[i].remove();
	}
	//recria o tabuleiro novamente
	tabuleiro()
	VezDoJogador = 'MIN'
	jogar()
})

function sair(){
	//audio
	const audio = new Audio('audio/tap.wav');
	audio.play();
	document.getElementById('carta').style.display = "none"
}
//criar tabuleiro
tabuleiro()
//criar piscando do DuckDank
piscando()
//cronometrar tempo
cronometro()
//chamada do duckPixels
duckChamada()
//adicionar ouvinte de escuta nos blocos
document.querySelector('.bloco0').addEventListener('click',jogar)
document.querySelector('.bloco1').addEventListener('click',jogar)
document.querySelector('.bloco2').addEventListener('click',jogar) 
document.querySelector('.bloco3').addEventListener('click',jogar)
document.querySelector('.bloco4').addEventListener('click',jogar)
document.querySelector('.bloco5').addEventListener('click',jogar) 
document.querySelector('.bloco6').addEventListener('click',jogar)
document.querySelector('.bloco7').addEventListener('click',jogar)
document.querySelector('.bloco8').addEventListener('click',jogar)
jogar()
/*funcionalidades da página*/
buttonDown.addEventListener('click', () => {

	if(repouso == false){
		//audio
		const audio = new Audio('audio/tap.wav');
		audio.play();
		//inercia
		let header = document.querySelector('header')
		header.style.background = "#ffeeb3"
		header.style.animation = "headerDecida 1s"
		document.querySelector('.logo').style.display = "block"
		document.querySelector('#down').src = "imagens/up.png"
		document.querySelector('.btn1').style.display = "block"
		document.querySelector('.btn2').style.display = "block"
		repouso = true
	}else if(repouso == true){
		//audio
		const audio = new Audio('audio/tap.wav');
		audio.play();
		//sair da inercia
		let header = document.querySelector('header')
		header.style.background = "#fff2bc"
		document.querySelector('.logo').style.display = "none"
		document.querySelector('#down').src = "imagens/b2.png"
		repouso = false
		document.querySelector('.btn1').style.display = "none"
		document.querySelector('.btn2').style.display = "none"
	}
})
btn1.addEventListener('click', () => {

})
btn2.addEventListener('click', () => {

})
imgDuckPixels.addEventListener('click', () => {
	const audio = new Audio('audio/duck_quack0448.mp3')
	audio.play();
	falar()
})
async function falar(){
	imgDuckPixels.style.animation = "falar 0.7s"
	await Sleep(0.7);
	imgDuckPixels.style.animation = ""
}