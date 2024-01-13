const Router = require('express');
const temperamentsRouter = Router();
const getTemperamentsHandler = require('../handlers/temperamentsHandler/getTempHandler');

temperamentsRouter.get('/', getTemperamentsHandler);

module.exports = temperamentsRouter;