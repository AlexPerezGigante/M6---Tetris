import { panel } from "../panel"
import { ranking } from "./ranking"
import { modificaNick, modificaData, modificaData2, insertaNuevaPartida } from "../operaciones"
export const jugar = {
    template: //html
    `
    <div class="mt-5 col-8 mx-auto" id="juego">
				<div class="row bg-dark border border-light p-5">
					<!-- Panel izquierda -->
					<div
						class="col-4 d-flex flex-column justify-content-end align-items-center p-5"
					>
						<h4>Nivel: <span id="nivel">1</span></h4>
						<h4>Tiempo: <span id="tiempo">00:00</span></h4>
						<h4>Lineas: <span id="lineas">0</span></h4>
						<h4>Puntos: <span id="puntos">0</span></h4>
					</div>
					<!-- Panel central -->
					<div class="col-4 d-flex justify-content-center">
						<div id="panel" class=" p-0 m-0 row">
							
						</div>
					</div>
					<!-- Panel derecha -->
					<div
						class="col-4 d-flex flex-column justify-content-start align-items-center p-5"
					>
						<div>
							<h4>Pieza siguiente:</h4>
							<div id="piezaSiguiente">
								<div class="piezaSiguiente m-2">
									<div class="fila d-flex justify-content-center">
										<div class="celda bg-primary bg-gradient border-dark">x</div>
										<div class="celda bg-dark border-secondary">x</div>
									</div>
									<div class="fila d-flex justify-content-center">
										<div class="celda bg-primary bg-gradient border-dark">x</div>
										<div class="celda bg-dark border-secondary">x</div>
									</div>
									<div class="fila d-flex justify-content-center">
										<div class="celda bg-primary bg-gradient border-dark">x</div>
										<div class="celda bg-primary bg-gradient border-dark">x</div>
									</div>
								</div>
								<div class="piezaSiguiente m-2">
									<div class="fila d-flex justify-content-center">
										<div class="celda bg-primary bg-gradient border-dark">x</div>
										<div class="celda bg-dark border-secondary">x</div>
									</div>
									<div class="fila d-flex justify-content-center">
										<div class="celda bg-primary bg-gradient border-dark">x</div>
										<div class="celda bg-dark border-secondary">x</div>
									</div>
									<div class="fila d-flex justify-content-center">
										<div class="celda bg-primary bg-gradient border-dark">x</div>
										<div class="celda bg-primary bg-gradient border-dark">x</div>
									</div>
								</div>
								<div class="piezaSiguiente m-2">
									<div class="fila d-flex justify-content-center">
										<div class="celda bg-primary bg-gradient border-dark">x</div>
										<div class="celda bg-dark border-secondary">x</div>
									</div>
									<div class="fila d-flex justify-content-center">
										<div class="celda bg-primary bg-gradient border-dark">x</div>
										<div class="celda bg-dark border-secondary">x</div>
									</div>
									<div class="fila d-flex justify-content-center">
										<div class="celda bg-primary bg-gradient border-dark">x</div>
										<div class="celda bg-primary bg-gradient border-dark">x</div>
									</div>
								</div>
							</div>
						</div>
						<hr />
						<div id="piezaGuardada">
							<h4>Pieza guardada:</h4>
							<div class="piezaGuardada">
								
							</div>
						</div>

						<div>
							

							<button type="button" id="guardar" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
							Guardar Partida
							</button>

							<!-- Modal -->
							<div class="modal fade text-dark" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
								<div class="modal-dialog">
									<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title" id="exampleModalLabel">Guardar partida?</h5>
										<button type="button" id="cerrar" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div class="modal-body">
										<p>Quieres guardar la partida?</p>
										<div id="formGuardar" class="">
										<div class="mb-3">
											<label for="nombre" class="form-label">Nombre: </label>
											<input type="text" class="form-control" id="nombre">
											<label for="enviar" class="form-label"></label>
											<input type="submit" class="form-control btn btn-primary" data-bs-dismiss="modal" id="enviar">
											
										</div>
									</div>
									</div>
									</div>
								</div>
							</div>

							
						</div>
					</div>
				</div>
			</div>
    `,
	script:() => {
		panel.controlTeclas()

		panel.pintaPanel()

		panel.nuevaPieza = panel.crearNuevaPieza()

		panel.piezasSiguientes.push(panel.crearNuevaPieza())
		panel.piezasSiguientes.push(panel.crearNuevaPieza())
		panel.piezasSiguientes.push(panel.crearNuevaPieza())


		panel.insertarPieza(panel.nuevaPieza)

		panel.pintaPanel()
		panel.mostrarPiezas()
		panel.iniciarMovimiento()
		if(panel.minutos>0 || panel.segundos>0){
			panel.pararMovimiento()
		}

		const botonGuardar = document.querySelector('#guardar')
		botonGuardar.addEventListener('click', panel.guardarPartida)

		

		// function guardarPartida(){
		// 	console.log('guardando')
		// 	panel.pararMovimiento()
		// 	document.querySelector('#formGuardar').classList.remove('d-none')
		// 	botonGuardar.classList.add('d-none')
		// 	// panel.abrirModal()
		// 	const botonEnviar = document.querySelector('#enviar')
		// 	botonEnviar.addEventListener('click', () => {
		// 		event.preventDefault()
		// 		const nombre = document.querySelector('#nombre').value.toUpperCase()
		// 		const puntos = panel.puntos
		// 		console.log(nombre, puntos)
		// 		const fecha = new Date()

		// 		const partida = {
		// 			avatar : 'https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg',
		// 			nick : modificaNick(nombre) ,
		// 			puntos : puntos,
		// 			fecha : modificaData(modificaData2(fecha))
		// 		}
		// 		insertaNuevaPartida(partida)


		// 		 document.querySelector('main').innerHTML = ranking.template;
    	// 		 ranking.script();

		// 	})
		// }
			
	}

	
}