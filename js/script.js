let quantidadeDeCartas = 0;
let localDasCartas = 0;

let imagensCartas = ["imagens/revertitparrot.gif","imagens/tripletsparrot.gif","imagens/bobrossparrot.gif","imagens/metalparrot.gif","imagens/explodyparrot.gif","imagens/fiestaparrot.gif","imagens/unicornparrot.gif"];
let imgCount = 0;

let cartasArray = [];
let cartasRandom = [];

let contador = 0;
let id = 0;

function gameBegin () {
    quantidadeDeCartas = Number(prompt("Com quantas cartas você quer jogar? \nEscolha um número par entre 4 e 14"));
    localDasCartas = document.querySelector("ul");
    contar();
    if((quantidadeDeCartas >= 4) & (quantidadeDeCartas <= 14) & (quantidadeDeCartas%2 === 0)) {
        for(let i = 1; i <= quantidadeDeCartas; i++){
            cartasArray.push(`
                <li onclick="clickcard(this)">
                    <div class="card-front hidden">
                        <img src=${imagensCartas[imgCount]}>
                    </div>
                    <div class="card-back">
                        <img src="imagens/card-back.png">
                    </div>
                </li>`);
            if(i%2 === 0) imgCount++;
        }
        cartasRandom = cartasArray.sort(comparador);
        for(let i = 0; i < quantidadeDeCartas; i++){
            localDasCartas.innerHTML += cartasRandom[i];
        }
    } else {
        gameBegin();
    }
}

gameBegin();

let cartasViradas = 0;
let primeiraCarta = 0;
let segundaCarta = 0;
let jogadas = 0;
let verificaDone = 0;
let contaCartasViradas = 0;

function clickcard(elemento){

    let imgFront = elemento.querySelector(".card-front");
    let imgBack = elemento.querySelector(".card-back");

    if(elemento !== primeiraCarta.parentNode & (cartasViradas !== 1) & (cartasViradas !== 2)){
        imgFront.classList.toggle("hidden");
        imgBack.classList.toggle("hidden");
        primeiraCarta = elemento.querySelector(".card-front");
        cartasViradas = 1;
        jogadas++;
    }

    if(elemento !== primeiraCarta.parentNode & (cartasViradas === 1) & (cartasViradas !== 2)){
        imgFront.classList.toggle("hidden");
        imgBack.classList.toggle("hidden");
        segundaCarta = elemento.querySelector(".card-front");
        jogadas++;

        if(primeiraCarta.innerHTML === segundaCarta.innerHTML){
            primeiraCarta.parentNode.classList.add(".done");
            segundaCarta.parentNode.classList.add(".done");
            segundaCarta.parentNode.removeAttribute("onclick");
            primeiraCarta.parentNode.removeAttribute("onclick");
            cartasViradas = 0;
            primeiraCarta = 0;
            segundaCarta = 0;
            gameEnd();
        }
        if(primeiraCarta.innerHTML !== segundaCarta.innerHTML){
            cartasViradas = 2;
            setTimeout(girar,1000);
        }
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

function girar(){
    primeiraCarta.classList.toggle("hidden");
    primeiraCarta.parentNode.querySelector(".card-back").classList.toggle("hidden");
    segundaCarta.classList.toggle("hidden");
    segundaCarta.parentNode.querySelector(".card-back").classList.toggle("hidden");
    cartasViradas = 0;
    primeiraCarta = 0;
    segundaCarta = 0;
}

function gameEnd(){
    verificaDone = document.querySelectorAll("li");
    contaCartasViradas = 0;
    for(let i = 0; i < verificaDone.length; i++){
        if(verificaDone[i].classList.contains(".done")){
            contaCartasViradas++;
            console.log(contaCartasViradas);
        }
    }
    if(quantidadeDeCartas === contaCartasViradas){
        setTimeout(endAlert,600);
    }
    console.log(verificaDone);
}

let reiniciar = 0;
function endAlert (){
    if(reiniciar !== "não"){
        alert(`Você ganhou em ${jogadas} jogadas, em ${contador} segundos !`);
    }
    clearInterval(id);
    reiniciar = prompt("Gostaria de reiniciar a partida ?\nResponda com sim ou não");
    if(reiniciar == "sim") {
        resetarLets();
        gameBegin();
    }
    if(reiniciar == "não"){
        endAlert();
    }
}
function resetarLets(){
    localDasCartas.innerHTML = "";
    quantidadeDeCartas = 0;
    localDasCartas = 0;
    imagensCartas = ["imagens/revertitparrot.gif","imagens/tripletsparrot.gif","imagens/bobrossparrot.gif","imagens/metalparrot.gif","imagens/explodyparrot.gif","imagens/fiestaparrot.gif","imagens/unicornparrot.gif"];
    imgCount = 0;
    cartasArray = [];
    cartasRandom = [];
    cartasViradas = 0;
    primeiraCarta = 0;
    segundaCarta = 0;
    jogadas = 0;
    verificaDone = 0;
    contaCartasViradas = 0;
    reiniciar = 0;
    id = 0;
}

function contar() {
    contador = 0;
    document.querySelector(".time").innerHTML = contador;
    id = setInterval(function(){
        contador++;
        document.querySelector(".time").innerHTML = contador;
    }, 1000);
  }