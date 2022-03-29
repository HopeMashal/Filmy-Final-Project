const omdbApi = async imdbId => {
  const apiKey = "43cbaea1";
  const response = await fetch(
    `https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`
  );
  const data = await response.json();
  return data;
};

export default omdbApi;