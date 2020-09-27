const jwt = require("jsonwebtoken");

module.exports = (request, res, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decodedTokenObject = jwt.verify(token, "SECRET_KEY");
    const userId = decodedTokenObject.userId;

    if (request.body.userId && request.body.userId !== userId) {
      throw "L'id de l'utilisateur n'est pas valable";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error ? error : "Requete non authentifie" });
  }
};
