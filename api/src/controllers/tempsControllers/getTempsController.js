const axios = require("axios");
const { Temperament } = require("../../db");
require("dotenv").config();
const { API_KEY } = process.env;

const URL = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`;

const getTemperaments = async () => {
  try {
    // Verificar si ya existen registros de temperamentos en la base de datos
    const existingTemperaments = await Temperament.findAll();
    if (existingTemperaments.length > 0) {
      console.log('Lo logramos! Mandando desde la base de datos!');
      return existingTemperaments;
    }

    //Si no existen:
    // Obtener los temperamentos de la API
    const response = (await axios.get(URL)).data;
    
    //creamos el arreglo vacío que almacenará a los objetos
    let temperaments = [];
    //Estructura de datos que nos ayuda a no repetir elementos
    const uniqueTemperamentsSet = new Set();

    //Almacenamos los temperamentos como objetos en el arreglo
    response.forEach(element => {
      if(element.temperament){
          let arr = element.temperament.split(', ');
          arr.forEach( elem => {
            const obj = { name: elem }
            //Verificamos que el elemento no se encuentre en el conjunto
            const isUnique = !uniqueTemperamentsSet.has(elem);
            if(isUnique){
              uniqueTemperamentsSet.add(elem);
              temperaments.push(obj);
            }
    
          })
      }
    });

    // Guardar los temperamentos en la base de datos utilizando el modelo Temperament
    await Temperament.bulkCreate(temperaments);

    return temperaments;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getTemperaments;