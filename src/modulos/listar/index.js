
import Handlebars from 'handlebars';

import template from './template.html';

let database;

let perros = [];

export default (_database) => {
	database = _database;
	perros = [];
	listarPerros();
}

const listarPerros = () => {
	const lista = database
					.ref('/perros')
					.once("value")
					.then((datos_perros) => {
						
						datos_perros.forEach((element) => {
							const datosPerro = element.val();
							datosPerro.id = element.key;
							perros.push(datosPerro);
						});
						
						render();
					});
}

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ perros });
}