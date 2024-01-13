const axios = require('axios');
const { Sequelize } = require('sequelize');
const { Dog, Temperament } = require('../../db');
require('dotenv').config();
const {
    API_KEY
} = process.env;
const cleaner = require('../../utils/dataUtils');
const URL = 'https://api.thedogapi.com/v1/breeds/search?q=';

const getDogByName = async (name) => {
  try {
    const dogsDB = await Dog.findAll({
      where: {
          name: {[Sequelize.Op.iLike]: `%${name}%`,}
      },
      include: {
        model: Temperament,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    });
    const infoAPI = (await axios.get(`${URL}${name}&api_key=${API_KEY}`)).data;
    const dogsAPI = cleaner(infoAPI);
    console.log('dogsDB=' + dogsDB + ' dogsAPI=' + dogsAPI);
    if( dogsDB.length === 0 && dogsAPI.length === 0){
      throw new Error('No se encontraron razas con el nombre especificado.')
    }
    return [...dogsDB, ...dogsAPI];
  } catch (error) {
    throw new Error('Error al obtener la raza con el nombre especificado.')
  }
    
};

module.exports = getDogByName;