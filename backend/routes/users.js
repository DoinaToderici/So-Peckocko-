const expres = require("express");
const saucesCtrl = require("../controller/users"); //importam controlerul
const router = expres.Router(); 

router.post("/signup", saucesCtrl.createUser);
router.post("/login", saucesCtrl.conectUser);

module.exports = router;
