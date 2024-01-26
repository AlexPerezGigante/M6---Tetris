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
        nick: "ANDER",
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
