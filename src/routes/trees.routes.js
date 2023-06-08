const router = require("express").Router();
const {
  renderTreeForm,
  saveTree,
  logout,
  signin,
  renderMapa,
} = require("../controllers/trees.controller");

router.get("/trees", renderTreeForm);
router.post("/trees", saveTree);
router.get("/logout", logout);
router.post("/signin", signin);
router.get("/mapa", renderMapa);

module.exports = router;




