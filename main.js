console.log("Esto es js");
// Array de objetos con los registros de los objetos
const partida = [
    {
        avatar: "https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg",
        nick: "ANDER",
        puntos: "10",
        fecha: "13 ABRIL 2023",
    },
    {
        avatar: "https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg",
        nick: "ANDER asda",
        puntos: "600",
        fecha: "13 FEBRERO 2023",
    },
    {
        avatar: "https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg",
        nick: "ANDER",
        puntos: "888",
        fecha: "1 ENERO 2023",
    },
];
// Objeto con un registro nuevo
const datosPartida = {
    avatar: "https://www.svgrepo.com/show/384672/account-avatar-profile-user-7.svg",
    nick: "MANUEL",
    puntos: 100,
    fecha: "21 MAYO 2023",
};

// Llamamos a las funciones que sacan las tablas y también llamamos a la que nos pide si queremos añadir una nueva o no
pintaRanking();
pintaTabla();
pintaDatosPartida(datosPartida);
// Esta función creará las tablas del ranking
function pintaRanking() {
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
								<td><img src="https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg" alt="avatar" /></td>
								<td>ANDER</td>
								<td>1255</td>
							</tr>
							<tr>
								<td class="fs-2">2</td>
								<td><img src="https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg" alt="avatar" /></td>
								<td>ANDER</td>
								<td>1255</td>
							</tr>
							<tr>
								<td class="fs-2">3</td>
								<td><img src="https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg" alt="avatar" /></td>
								<td>ANDER</td>
								<td>1255</td>
							</tr>
						</tbody>
						<tfoot></tfoot>
					</table>
    `;
    console.log(tablaRanking);
    document.querySelector("#ranking").innerHTML = tablaRanking;
}
// Esta función crea las tablas de las partidas
function pintaTabla() {
    let tablaPartida = `
    <h2 class="text-center text-light">Partidas</h2>
					<div class="input-group mb-3">
						<input
							type="text"
							class="form-control"
							placeholder="Buscador"
							aria-label="Buscador"
							aria-describedby="button-addon2"
						/>
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
								<td>Nick <i class="bi bi-arrow-up-square"></i></td>
								<td>Puntuación <i class="bi bi-arrow-up-square"></i></td>
								<td>Fecha <i class="bi bi-arrow-up-square"></i></td>
							</tr>
						</theader>
						<tbody>`;
    // Con el bucle for each añadimos los datos del array de objetos
    partida.forEach((element) => {
        tablaPartida += `
                    <tr>
                    <td><img src="${element.avatar}" alt="avatar" /></td>
                    <td>${element.nick}</td>
                    <td>${element.puntos}</td>
                    <td>${element.fecha}</td>
                </tr>
                `;
    });

    tablaPartida += `		
                </tbody>
			<tfoot></tfoot>
		</table>
    `;
    console.log(tablaPartida);
    document.querySelector("#partidas").innerHTML = tablaPartida;
}
// Esta función recibe los datos nuevos y los mete en el array de objetos
function insertaNuevaPartida(datosPartida) {
    console.log("Guardando partida...");
    console.log(datosPartida);
    partida.push(datosPartida);
    console.log(partida);
}
// Esta función nos dice si queremos guardar la partida, si la queremos guardar
//  llamará a la función que mete los datos en el array de objetos y luego llamará a la función que pinta las tablas. Si no solo mostrará un mensaje por consola
function pintaDatosPartida(partida) {
    if (confirm("Guardar partida?") == true) {
        insertaNuevaPartida(partida);
        pintaTabla();
    } else {
        console.log("No has guardado la partida!");
    }
}

// Esta función recibe un nombre y le cambia los espacios por _ y lo pone en mayúsculas, tambíen tiene un control de errores para que no pueda recibir un nombre vacío y lo devuelve
function modificaNick(nick){
	if(nick.lengh==0){
		alert("El nick no pot estar en blanc")
		return(null)
	}
	else{
		let nuevoNick=nick.replaceAll(" ", "_")
		nuevoNick=nuevoNick.trim()
		nuevoNick=nuevoNick.toUpperCase()
		return(nuevoNick)
	}
}

// Esta función recibe una fecha y le cambia el formato
function modificaData(data){
	
	// “27 enero 2022 - 18:05:12”
	console.log("modificaData")
	const mes=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
	const miData = new Date(data)
	const fecha=miData.getDay()+" "+mes[miData.getMonth()-1]+" "+miData.getFullYear()+" - "+miData.getHours()+":"+miData.getMinutes()+":"+miData.getSeconds()
	return(fecha)
}

// Esta función recibe una fecha y le cambia el formato
function modificaData2(data=new Date()){
	const fecha=data.getFullYear()+"/"+data.getMonth()+"/"+data.getDay()+"T"+data.getHours()+":"+data.getMinutes()+":"+data.getSeconds()
	return(fecha)
}

// Esta función calcula los dias que han pasado a partir de una fecha que recibirá y la hora actual.
function dias(dataText){
	const miData = new Date(dataText)
	const fechaActual = new Date()
	const diferencia=fechaActual.getTime()- miData.getTime()
	const diasTranscurridos=diferencia/86400000
	return(Math.floor(diasTranscurridos))
}

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
