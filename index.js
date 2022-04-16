const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "client/build");

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`port running at ${PORT}`);
});