const axios = require('axios');
const { Dog, Temperament } = require('../../db');
require('dotenv').config();
const {
    API_KEY
} = process.env;
const cleaner = require('../../utils/dataUtils');
const URL = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`;

const getAllDogs = async () => {
    const dogsDB = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    });
    const infoAPI = (await axios.get(URL)).data;
    const dogsAPI = cleaner(infoAPI);
    return [...dogsDB, ...dogsAPI];
}


module.exports = getAllDogs;