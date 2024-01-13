const Router = require('express');
const dogsRouter = Router();
const { getDogsHandler } = require('../handlers/dogsHandler/dogsHandler');
const { getDogHandler } = require('../handlers/dogsHandler/getDogHandler');
const { createDogHandler } = require('../handlers/dogsHandler/postDogHandler');

dogsRouter.get('/', getDogsHandler);
dogsRouter.get('/:id', getDogHandler);
dogsRouter.post('/', createDogHandler);

module.exports = dogsRouter;

