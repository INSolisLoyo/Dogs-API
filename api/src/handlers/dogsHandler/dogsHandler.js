const getAllDogs  = require('../../controllers/dogsControllers/getAllDogsController');
const getDogByName = require('../../controllers/dogsControllers/getDogByNameController');

const getDogsHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if(name){
            const response = await getDogByName(name);
            res.status(200).json(response);
        }
        else{
            const response  = await getAllDogs();
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getDogsHandler };