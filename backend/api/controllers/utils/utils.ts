import Movie from '../../../models/movie';

export const addMovie = async (information) => {
  const createdMovie = new Movie(information);
  return createdMovie;
};
