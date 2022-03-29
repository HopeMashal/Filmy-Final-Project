const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: 'bfbfcd7a0a9eb72e09e8471e9738fa9e',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;