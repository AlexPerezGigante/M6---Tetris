import { panel } from "../panel"
export const jugar = {
    template: //html
    `
    <div class="mt-5 col-8 mx-auto" id="juego">
				<div class="row bg-dark border border-light p-5">
					<!-- Panel izquierda -->
					<div
						class="col-4 d-flex flex-column justify-content-end align-items-center p-5"
					>
						<h4>Nivel: <span>1</span></h4>
						<h4>Tiempo: <span>00:00</span></h4>
						<h4>Lineas: <span>n/d</span></h4>
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
						<div id="piezaSiguiente">
							<h4>Pieza siguiente:</h4>
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
						<hr />
						<div id="piezaGuardada">
							<h4>Pieza guardada:</h4>
							<div class="piezaGuardada">
								<div class="piezaSiguiente m-2">
									<div class="fila d-flex justify-content-center">
										<div class="celda bg-warning bg-gradient border-dark">x</div>
										<div class="celda bg-warning border-secondary">x</div>
									</div>
									<div class="fila d-flex justify-content-center">
										<div class="celda bg-warning bg-gradient border-dark">x</div>
										<div class="celda bg-warning border-secondary">x</div>
									</div>
								</div>
							</div>
						</div>

						<div>
							<button class=" btn btn-success mt-5 " id="guardar">Guardar Partida</button>
							<div id="formGuardar" class="d-none">
									<div class="mb-3">
										<label for="nombre" class="form-label">Nombre</label>
										<input type="text" class="form-control" id="nombre">
										<label for="enviar" class="form-label"></label>
										<input type="submit" class="form-control btn btn-primary " id="enviar">
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

		panel.insertarPieza(panel.nuevaPieza)

		panel.pintaPanel()

		panel.iniciarMovimiento()

		const botonGuardar = document.querySelector('#guardar')
		botonGuardar.addEventListener('click', guardarPartida)

		function guardarPartida(){
			panel.pararMovimiento()
			document.querySelector('#formGuardar').classList.remove('d-none')
			botonGuardar.classList.add('d-none')

			const botonEnviar = document.querySelector('#enviar')
			botonEnviar.addEventListener('submit', enviarDatos)
		}

		function enviarDatos(){
			
		}
		
	}
}