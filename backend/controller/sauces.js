const sauceSchema = require("../models/Sauce");

exports.getAllSauces = (req, res) => {
  sauceSchema
    .find()
    .then(function (response) {
      res.status(200).json(response);
    })
    .catch(function (error) {
      res.status(400).json(error); 
    });
};

exports.getOneSauce = (req, res) => {
  sauceSchema
    .findOne({ _id: req.params.id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce); 
  const imageObject = req.file; 
  const imageUrl = `http://localhost:3000/${imageObject.path}`;
  const sauce = new sauceSchema({
    ...sauceObject,
    imageUrl,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  sauce
    .save()
    .then(() => res.json({ message: "Le sauce a été enregistré !" }))
    .catch((error) => {
      res.json({ error });
    });
};

exports.updateOneSauce = (req, res) => {
  if (req.file !== undefined) {
    const sauceObject = JSON.parse(req.body.sauce);
    const imageObject = req.file;
    const imageUrl = `http://localhost:3000/${imageObject.path}`;
    sauceSchema
      .updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id, imageUrl: imageUrl }
      )
      .then(() => res.status(200).json({ message: "Objet modifié" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    sauceSchema
      .updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: "Objet modifié" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.deleteOneSauce = (req, res) => {
  sauceSchema
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce effacée" }))
    .catch((error) => {
      res.json({ error });
    });
};

exports.likeSauce = async (req, res) => {
  try {
    const sauceDocument = await sauceSchema.findOne({ _id: req.params.id });
    const data = {
      usersLiked: sauceDocument.usersLiked,
      likes: sauceDocument.likes,
      usersDisliked: sauceDocument.usersDisliked,
      dislikes: sauceDocument.dislikes,
    };

    let text;

    if (req.body.like === 1) {
      data.likes++;
      data.usersLiked.push(req.body.userId);
      text = "aimez  la sauce";
    }
    if (req.body.like === -1) {
      data.dislikes++;
      data.usersDisliked.push(req.body.userId);
      text = "aimez pas  la sauce";
    }
    if (req.body.like === 0) {
      text = "avez annuler votre choix";
      if (data.usersLiked.includes(req.body.userId)) {
        const index = data.usersLiked.indexOf(req.body.userId);
        data.usersLiked.splice(index, 1);
        data.likes--;
      }

      if (data.usersDisliked.includes(req.body.userId)) {
        const index = data.usersDisliked.indexOf(req.body.userId);
        data.usersDisliked.splice(index, 1);
        data.dislikes--;
      }
    }

    await sauceDocument.updateOne(data);
    res.status(200).json({ message: `Vous ${text}` });
  } catch (error) {
    res.json({ error });
  }
};
