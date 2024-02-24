import { partidas, buscador, orden} from "../operaciones";
export const ranking = {
    template: //html
    `
	<!-- Pantalla tablas y ranking -->
	<!-- Pantalla tablas y ranking -->
	<div id="info" class="">
	<div id="ranking" class="m-5 p-5 bg-dark">
		
	</div>

	<div id="partidas" class="m-5 p-5 bg-dark">
		
	</div>
	</div>
	`,
	script:() => {
		console.log("Esto es js");


// Esta función creará las tablas del ranking
function pintaRanking() {
	const arrayOrdenado = orden('puntuacion', 'down')
    let tablaRanking = `
    <h2 class="text-center text-light">Ranking</h2>
					<table class="table table-dark align-middle">
						<theader>
							<tr class="bg-dark">
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</theader>
						<tbody>
							<tr>
								<td class="fs-2">1</td>
								<td><img src="${arrayOrdenado[0].avatar}" alt="avatar" /></td>
								<td>${arrayOrdenado[0].nick}</td>
								<td>${arrayOrdenado[0].puntos}</td>
							</tr>
							<tr>
								<td class="fs-2">2</td>
								<td><img src="${arrayOrdenado[1].avatar}" alt="avatar" /></td>
								<td>${arrayOrdenado[1].nick}</td>
								<td>${arrayOrdenado[1].puntos}</td>
							</tr>
							<tr>
								<td class="fs-2">3</td>
								<td><img src="${arrayOrdenado[2].avatar}" alt="avatar" /></td>
								<td>${arrayOrdenado[2].nick}</td>
								<td>${arrayOrdenado[2].puntos}</td>
							</tr>
						</tbody>
						<tfoot></tfoot>
					</table>
    `;
    // console.log(tablaRanking);
    document.querySelector("#ranking").innerHTML = tablaRanking;
}
// Esta función crea las tablas de las partidas
function pintaTabla(partida) {
    let tablaPartida = `
    <h2 class="text-center text-light">Partidas</h2>
					<div class="input-group mb-3">
						<input
							type="text"
							class="form-control"
							placeholder="Buscador nick"
							aria-label="Buscador"
							aria-describedby="button-addon2"
						/>
						<button
							class="btn btn-outline-secondary"
							type="button"
							id="botonBuscar"
						>
						<i class="bi bi-search"></i>
						</button>
						<button
							class="btn btn-outline-secondary"
							type="button"
							id="button-addon2"
						>
							<i class="bi bi-x-lg"></i>
						</button>
					</div>
					<table class="table table-dark">
						<theader>
							<tr>
								<td></td>
								<td>Nick <button id='botonNick' class='btn btn-outline-light border-0 btn-lg'><i id='iconoNick' class="bi bi-arrow-up-square col-12"></i></button></td>
								<td>Puntuación <button id='botonPuntuacion' class='btn btn-outline-light border-0 btn-lg'><i id='iconoPuntuacion' class="bi bi-arrow-up-square col-12"></i></button></td>
								<td>Fecha <button id='botonFecha' class='btn btn-outline-light border-0 btn-lg'><i id='iconoFecha' class="bi bi-arrow-up-square col-12"></i></button></td>
							</tr>
						</theader>
						<tbody id='tabla'>`;
    // console.log(tablaPartida);
    document.querySelector("#partidas").innerHTML = tablaPartida;
}
function pintaDatos(partida){
	// Con el bucle for each añadimos los datos del array de objetos
	
	let tabla =''
    partida.forEach((element, index) => { 
		if(typeof partida == 'string'){
			if(partidas[index].nick==partida){
				tabla += `<tr>
                    <td><img src="${element.avatar}" alt="avatar" /></td>
                    <td>${element.nick}</td>
                    <td>${element.puntos}</td>
                    <td>${element.fecha}</td>
                </tr>
                `
			}
		}else{
			tabla += `<tr>
                    <td><img src="${element.avatar}" alt="avatar" /></td>
                    <td>${element.nick}</td>
                    <td>${element.puntos}</td>
                    <td>${element.fecha}</td>
                </tr>
                `
		}
		;
    });
    tabla += `		
                </tbody>
			<tfoot></tfoot>
		</table>
    `;
	document.querySelector("#tabla").innerHTML = tabla;
}
// Llamamos a las funciones que sacan las tablas y también llamamos a la que nos pide si queremos añadir una nueva o no
pintaRanking();
pintaTabla();
// pintaDatosPartida(datosPartida);
pintaDatos(partidas)


function buscadorlog(){
	console.log('has pulsado un boton')
	const inputBuscador = document.querySelector("input")
	console.log('Buscador: ',inputBuscador.value)
	const resultado = buscador(inputBuscador.value)
	pintaDatos(resultado)
}

const botonBuscar = document.querySelector("#botonBuscar")
botonBuscar.addEventListener("click", buscadorlog)

function botonOrden(campo){
	botonNick.getAttribute
	let atributo 
	let giraIcono
	switch(campo){
        case 'nick':
			const iconoNick = document.getElementById('iconoNick')
			atributo = iconoNick.getAttribute('class')
			giraIcono = document.querySelector('#iconoNick')
			console.log('nick')
        break
        case 'puntuacion':
			const iconoPuntuacion = document.getElementById('iconoPuntuacion')
			atributo = iconoPuntuacion.getAttribute('class')
			giraIcono = document.querySelector('#iconoPuntuacion')
			console.log('puntuacion')
        break
        case 'fecha':
			const iconoFecha = document.getElementById('iconoFecha')
			atributo = iconoFecha.getAttribute('class')
			giraIcono = document.querySelector('#iconoFecha')
			console.log('fecha')
        break
    }
	let arrayOrdenado
	if(atributo=='bi bi-arrow-up-square col-12'){
	  arrayOrdenado = orden(campo, 'down')
	  giraIcono.setAttribute('class','bi bi-arrow-down-square col-12')
	}
	else{
	  arrayOrdenado = orden(campo, 'up')
	  giraIcono.setAttribute('class','bi bi-arrow-up-square col-12')
	}
	pintaDatos(arrayOrdenado)
}

const botonFecha = document.querySelector("#botonFecha")
botonFecha.addEventListener("click", ()=>{botonOrden('fecha')})

const botonNick = document.querySelector("#botonNick")
botonNick.addEventListener("click", ()=>{botonOrden('nick')})

const botonPuntuacion = document.querySelector("#botonPuntuacion")
botonPuntuacion.addEventListener("click", ()=>{botonOrden('puntuacion')})

const ls = {
	avatar : 'imagen2.png',
	nick : 'PEDRA',
	puntuacion : 1561,
	fecha : '23/09/05T13:12:00'
}

// Esta función agrega a localStorage un objeto.
function lsSetDades(dades){
	const tetris_Dades = JSON.stringify(dades)
	localStorage.setItem('tetris_Dades', tetris_Dades)
	return(true)
}

// Esta función lee el localStorage devuelve un onbjeto JSON
function lsGetDades(){
	const textoLocal = localStorage.getItem('tetris_Dades')
	const dades = JSON.parse(textoLocal)
	console.log(dades)
	return(dades)
}

// Esta función recibe un objeto, lee el localStorage, agrega un registro al objeto JSON del localStorage y lo vueve a subir al localStorage
function registraPartida(partida){
	const textoLocal = localStorage.getItem('tetris_Dades')
	const dades = JSON.parse(textoLocal)
	dades.push(partida)
	const tetris_Dades = JSON.stringify(dades)
	localStorage.setItem('tetris_Dades', tetris_Dades)
}
	}
} 