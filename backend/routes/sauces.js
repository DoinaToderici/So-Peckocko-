const express = require("express");
const saucesCtrl = require("../controller/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

const router = express.Router(); //methode express router

router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", multer.single("image"), auth, saucesCtrl.updateOneSauce);
router.delete("/:id", auth, saucesCtrl.deleteOneSauce);
router.post("/", auth, multer.single("image"), saucesCtrl.createSauce);
router.post("/:id/like", auth, saucesCtrl.likeSauce);

module.exports = router;
