const headers = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //permet d'acceder a notre Api depuis n'importe quelle origine '*'
  res.setHeader(
    "Access-Control-Allow-Headers", //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods", //d'envoyer des requêtes avec les méthodes mentionnées
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
};

module.exports = headers;
