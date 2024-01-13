const axios = require('axios');
const { Dog, Temperament } = require('../../db');

const createDogController = async (image, name, height, weight, life_span, temperament) => {
    const newDog = await Dog.create({image, name, height, weight, life_span});
    newDog.addTemperaments(temperament);
    return newDog;
}

module.exports = createDogController;