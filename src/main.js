import { header } from "./componentes/header"
import { home } from "./vistas/home"
import { ranking } from "./vistas/ranking"
import { jugar } from "./vistas/jugar"

document.querySelector('header').innerHTML = header.template
document.querySelector('main').innerHTML = home.template

const botonHome = document.querySelector("#botonHome");
botonHome.addEventListener("click", cargarHome);

const botonRanking = document.querySelector("#botonRanking");
botonRanking.addEventListener("click", cargarRanking);

const botonJugar = document.querySelector(".botonJugar");
botonJugar.addEventListener("click", cargarJuego);

function cargarHome(){
    document.querySelector('main').innerHTML = home.template;
}

function cargarRanking(){
    document.querySelector('main').innerHTML = ranking.template;
    ranking.script();
}

function cargarJuego(){
    document.querySelector('main').innerHTML = jugar.template;
    jugar.script()
}







