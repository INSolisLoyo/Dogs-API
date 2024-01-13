const getDogDetail = require('../../controllers/dogsControllers/getDogByIdController');

const getDogHandler = async (req, res) => {
    const { id } = req.params;
    //Verifica si es NaN (Not a Number) mandará true, en cambio false
    const source = isNaN(id) ? "bd" : "api";
    try {
      
        const response = await getDogDetail(id, source);
        res.status(200).json(response);
      
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getDogHandler };