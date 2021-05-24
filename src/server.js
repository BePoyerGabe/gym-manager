const express = require("express");
const nunjucks = require("nunjucks");
const methodOverride = require("method-override");
const routes = require("./routes");

const server = express();

require("dotenv").config();

// use é um middleware, antes da iniciação e depois da instanciação, palavra lembra meio

server.use(
  express.urlencoded({
    extended: true,
  })
);
server.use(express.static("public"));
server.set("view engine", "njk");
server.use(methodOverride("_method"));
server.use(routes);

nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(5000, function () {
  console.log("server is running");
});
