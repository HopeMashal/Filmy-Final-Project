import express from 'express';
import {
  getAllMovies,
  getMovie,
  createMovie,
  editMovie,
  deleteMovie,
  filterMovies,
} from '../controllers/movie.controllers';
import authentication from '../../middleware/authentication';
import authorization from '../../middleware/authorization';
const movieRouter = express.Router();

movieRouter.get('/movies', getAllMovies);
movieRouter.get('/movies/:searchTerm', filterMovies);
movieRouter.get('/movies/:id', getMovie);
movieRouter.post('/movies', authentication, authorization, createMovie);
movieRouter.put('/movies/:id', authentication, authorization, editMovie);
movieRouter.delete('/movies/:id', authentication, authorization, deleteMovie);

export default movieRouter;
