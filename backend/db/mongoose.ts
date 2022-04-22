const mongoose = require('mongoose');

const dbURL = process.env.MONGO_URL;

mongoose.connect(dbURL, (err, client) => {
  if (client) console.log('connected to DB');
  if (err) console.log(err);
});
