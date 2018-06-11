

import Handlebars from 'handlebars';
import { guid } from '../../utils';

import template from './template.html';

let mensaje = '';

let database;

export default (_database) => {
  database = _database;
  render();
};

const crearNuevoPerro = (e) => {

  e.preventDefault();

  const perro = {
    id: guid(),
    nombre: document.getElementById('nombre').value,
    raza: document.getElementById('raza').value,
    anios: document.getElementById('edad').value,
  };
console.log(perro);
  database.ref(`perros/${perro.id}`).set({
    nombre: perro.nombre,
    raza: perro.raza,
    anios: perro.anios,
  })
  .then(() => {
    mensaje = 'Perro creado correctamente!';
    render();
  });

  return false;
};

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({mensaje});
	document.getElementById('boton-nuevo').onclick = crearNuevoPerro;
}