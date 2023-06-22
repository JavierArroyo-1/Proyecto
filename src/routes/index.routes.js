const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderAbout, renderHome, } = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/home", renderHome);
router.get("/trees", (req, res) => {
  res.render("trees"); // Ajusta esto según el nombre de tu archivo de vista
});
router.get("/mapa", (req, res) => {
  res.render("mapa"); // Ajusta esto según el nombre de tu archivo de vista
});
router.get("/grafica", (req, res) => {
  res.render("grafica"); // Ajusta esto según el nombre de tu archivo de vista
});

module.exports = router;

