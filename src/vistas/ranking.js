export const ranking = {
    template: //html
    `
	<!-- Pantalla tablas y ranking -->
			<div id="info" class="">
				<div id="partidas" class="m-5 p-5 bg-dark">
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
								<td><img src="" alt="avatar" /></td>
								<td>ANDER</td>
								<td>1255</td>
							</tr>
							<tr>
								<td class="fs-2">2</td>
								<td><img src="" alt="avatar" /></td>
								<td>ANDER</td>
								<td>1255</td>
							</tr>
							<tr>
								<td class="fs-2">3</td>
								<td><img src="" alt="avatar" /></td>
								<td>ANDER</td>
								<td>1255</td>
							</tr>
						</tbody>
						<tfoot></tfoot>
					</table>
				</div>

				<div id="partidas" class="m-5 p-5 bg-dark">
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
						<tbody>
							<tr>
								<td><img src="" alt="avatar" /></td>
								<td>ANDER</td>
								<td>10</td>
								<td>13 ABRIL 2023</td>
							</tr>
							<tr>
								<td><img src="" alt="avatar" /></td>
								<td>ANDER</td>
								<td>600</td>
								<td>13 FEBRERO 2023</td>
							</tr>
							<tr>
								<td><img src="" alt="avatar" /></td>
								<td>ANDER</td>
								<td>888</td>
								<td>1 ENERO 2023</td>
							</tr>
						</tbody>
						<tfoot></tfoot>
					</table>
				</div>
			</div>
	`
} 