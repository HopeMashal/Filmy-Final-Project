import express, { Request, Response } from 'express';
import Movie from '../../models/movie';
import { addMovie } from './utils/utils';
import { getMovieData, getMoviesData } from '../../services/movie.services';

const app = express();
app.use(express.json());

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await getMoviesData();
    if (!movies.length) {
      res.status(404).send('No Movies Found');
    } else res.status(200).send(movies);
  } catch (e: any) {
    res.send(e.message);
  }
};

export const getMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await getMovieData(id);
    if (!movie) {
      throw Error('Movie not Found');
    } else res.send(movie);
  } catch (e) {
    res.send({ error: e });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const movie = await addMovie(req.body);

    await movie.save();
    res.status(201).send(movie);
  } catch (e: any) {
    res.send(e.message);
  }
};
export const editMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);
    if (!movie) throw Error('Movie not found');
    const newMovie = req.body;
    for (const prop in newMovie) {
      movie[prop] = newMovie[prop];
    }
    await movie.save();
    res.send(movie);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.status(200);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};
export const filterMovies = async (req: Request | any, res: Response) => {
  try {
    const { searchTerm } = req.params;
    const filteredList = await Movie.find({ name: { $regex: `${searchTerm}` } });
    if (!filteredList.length) {
      res.status(404).send('No Movies Match Your Search Term');
    } else res.send(filteredList);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};
