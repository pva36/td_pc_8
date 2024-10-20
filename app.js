require("dotenv").config();
const express = require("express");
const routes = require("./app/routes");

const app = express();

/**
 * Sync the DB (should I consider this?)
 */

const db = require("./app/models");

db.sequelize
  .sync({
    force: true,
  })
  .then(() => {
    console.log("Eliminando y resincronizando la base de datos.");
  });

/**
 * application level middleware
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/signup", routes.signup);
// app.use("/api/signin", routes.signin);
// app.use("/api/user", routes.user);
app.use("/api/bootcamp", routes.bootcamp);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
