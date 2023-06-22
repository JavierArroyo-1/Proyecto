const router = require("express").Router();
const {
  renderTreeForm,
  saveTree,
  logout,
  signin,
  renderMapa,
  showTreeOnMap,
  getTrees
} = require("../controllers/trees.controller");

router.get("/trees", renderTreeForm);
router.post("/trees", saveTree);
router.get("/logout", logout);
router.post("/signin", signin);
router.get("/mapa", renderMapa); 
router.get("/trees/mapa/:arbolId", showTreeOnMap);
router.get('/grafica', getTrees);

module.exports = router;




