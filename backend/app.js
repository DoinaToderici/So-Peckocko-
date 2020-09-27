const express = require("express");
const bodyParser = require("body-parser"); //transforme les données de req.body in format json(POST/PUT)
const mongoose = require("mongoose");
const path = require("path"); //package pour la creation du chemin
const headers = require("./middleware/headers"); //middleware headers
const dotenv = require("dotenv");
dotenv.config();
const imagesPath = path.join(__dirname, "/images");
const helmet = require("helmet");

//importer les routes
const saucesRoutes = require("./routes/sauces");
const usersRoutes = require("./routes/users");

//lancement express
const app = express();

//seter  middleware-le globale
app.use(bodyParser.json());
app.use(headers); //ajoutons des en-têtes à l'objet de réponse, afin que les origines (frontend et backend) puissent communiquer entre elles
app.use("/images", express.static(imagesPath)); // facem accesibile datele statice (creaza url pentru imagini)
app.use(helmet()); //helmet(sécurisation des données de l'express)

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.h1pef.mongodb.net/piquante?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !", error));

//la partie commune  pour toutes les API
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", usersRoutes);

module.exports = app;
