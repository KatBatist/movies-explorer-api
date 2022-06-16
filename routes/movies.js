const moviesRouter = require('express').Router();
const { validateCreateMovie, validateMovieId } = require('../middlewares/validate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', validateCreateMovie, createMovie);
moviesRouter.delete('/movies/:_id', validateMovieId, deleteMovie);

module.exports = moviesRouter;
