const axios = require('axios');
const { Dog, Temperament } = require('../../db');
require('dotenv').config();
const {
    API_KEY
} = process.env;
const cleaner = require('../../utils/dataUtils');
const URL = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`;

const getDogDetail = async (id, source) => {
    if(source === 'api'){
        const infoAPI = (await axios.get(URL)).data;
        const dogAPI = infoAPI.filter((dog) => dog.id.toString() === id);
        const dogById= cleaner(dogAPI);
        return dogById;
    }
    else {
        const dogById = await Dog.findByPk(id, {
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                  attributes: []
                }
            }
        })
        return dogById;
    }
}

module.exports = getDogDetail;