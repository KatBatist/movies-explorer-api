const cardsRouter = require('express').Router();
const { validateCreateMovie, validateMovieId } = require('../middlewares/validate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

cardsRouter.get('/movies', getMovies);
cardsRouter.post('/movies', validateCreateMovie, createMovie);
cardsRouter.delete('/movies/:_id', validateMovieId, deleteMovie);

module.exports = cardsRouter;
