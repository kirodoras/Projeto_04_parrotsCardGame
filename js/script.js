let quantidadeDeCartas = 0;
let localDasCartas = 0;

let imagensCartas = ["imagens/revertitparrot.gif","imagens/tripletsparrot.gif","imagens/bobrossparrot.gif","imagens/metalparrot.gif","imagens/explodyparrot.gif","imagens/fiestaparrot.gif","imagens/unicornparrot.gif"];
let imgCount = 0;

let cartasArray = [];
let cartasRandom = [];

function gameBegin () {
    quantidadeDeCartas = Number(prompt("Com quantas cartas você quer jogar? \n Escolha um número par entre 4 e 14"));
    localDasCartas = document.querySelector("ul");

    if((quantidadeDeCartas >= 4) & (quantidadeDeCartas <= 14) & (quantidadeDeCartas%2 === 0)) {
        for(let i = 1; i <= quantidadeDeCartas; i++){
            cartasArray.push(`
                <li onclick="clickcard(this)">
                    <div class="card-front hidden">
                        <img class= "" src=${imagensCartas[imgCount]}>
                    </div>
                    <div class="card-back">
                        <img class= "" src="imagens/card-back.png">
                    </div>
                </li>`);
            if(i%2 === 0) imgCount++;
        }
        cartasRandom = cartasArray.sort(comparador);
        for(let i = 0; i < quantidadeDeCartas; i++){
            localDasCartas.innerHTML += cartasRandom[i]
        }
    } else {
        gameBegin();
    }
}

gameBegin();

function clickcard(elemento){
    if(elemento.querySelector(".card-front").classList.contains("hidden")){
        console.log("contem");
    }
    let imgFront = elemento.querySelector(".card-front").classList.toggle("hidden");
    let imgBack = elemento.querySelector(".card-back").classList.toggle("hidden");

}

function comparador() { 
	return Math.random() - 0.5; 
}