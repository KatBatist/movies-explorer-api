const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const NotReqError = require('../errors/not-req-err');
const ForbiddenError = require('../errors/forbidden-err');

const { FORBIDDEN_ERROR, NOT_FOUND_ERROR_MOVIE, NOT_REQ_ERROR } = require('../utils/constants');

const getMovies = (req, res, next) => {
  const id = req.user._id;
  Movie.find({ id })
    .then((movies) => {
      res.status(200).send({ data: movies });
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.status(200).send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotReqError(`${NOT_REQ_ERROR}: ${err}`));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const id = req.user._id;
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_ERROR_MOVIE);
      }
      if (movie.owner.toString() !== id) {
        throw new ForbiddenError(FORBIDDEN_ERROR);
      } else {
        Movie.findByIdAndRemove(req.params._id)
          .then((movieDelete) => {
            res.status(200).send({ data: movieDelete });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
