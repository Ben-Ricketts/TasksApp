const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

const port = process.env.PORT || 3000;

// Config dotenv
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<db_password>", process.env.DBPASS);

mongoose.connect(DB).then(() => {
  console.log("DB CONNECTED");
});

// Connect to server

const server = app.listen(port, () =>
  console.log(`http://localhost:${port}...`)
);
