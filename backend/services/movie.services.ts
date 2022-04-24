import Movie from '../models/movie';

export const getMoviesData = async () => {
  const movies = await Movie.find({});
  if (!movies) throw Error();
  return movies;
};
export const getMovieData = async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) throw Error();
  return movie;
};
