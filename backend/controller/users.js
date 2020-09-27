const userSchema = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res) => {
  const userObject = req.body;
  bcrypt
    .hash(userObject.password, 10)
    .then(function (passwordHash) {
      const newUserObject = { email: userObject.email, password: passwordHash };
      const user = new userSchema(newUserObject);

      user
        .save()
        .then(() => res.json({ message: "Vous êtes enregistré !" }))
        .catch((error) => {
          if (error.keyPattern.email === 1) {
            res.json({
              message: `Ce email:  ${error.keyValue.email} existe déjà`,
            });
          }
          res.json({ error });
        });
    })
    .catch((error) => {
      res.json(error);
    });
};

exports.conectUser = (req, res) => {
  userSchema
    .findOne({ email: req.body.email })
    .then((response) => {
      if (!response) {
        res.status(401).json({ error: "Utlisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, response.password)
        .then(function (valid) {
          if (!valid) {
            res.status(401).json({ error: "MDP ne correspond pas" });
          }

          res.json({
            userId: response._id,
            token: jwt.sign({ userId: response._id }, "SECRET_KEY", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => {
          res.status(500).json({ error }); // erreur de connexion
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
