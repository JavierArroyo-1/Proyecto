const treesCtrl = {};
const Trees = require('../models/Trees');
const passport = require("passport");

treesCtrl.renderTreeForm = (req, res) => {
  res.render('trees');
};

treesCtrl.saveTree = async (req, res) => {
  let errors = [];
  const { latitud, longitud, caracteristicas, nombre, fecha } = req.body;
  const containsNumbers = /\d/.test(nombre);

  if (containsNumbers) {
    errors.push({ text: "El nombre no debe contener números." });
  }

  if (isNaN(parseFloat(latitud))) {
    errors.push({ text: "La latitud debe ser un número." });
  }

  if (isNaN(parseFloat(longitud))) {
    errors.push({ text: "La longitud debe ser un número." });
  }

  if (isNaN(Date.parse(fecha))) {
    errors.push({ text: "La fecha debe ser una fecha válida." });
  }

  if (errors.length > 0) {
    res.render('trees', {
      errors,
      nombre,
      latitud,
      longitud,
      caracteristicas,
      fecha
    });
  } else {
    const ubicacion = {
      latitud: parseFloat(latitud),
      longitud: parseFloat(longitud)
    };

    const nuevoTree = new Trees({ nombre, ubicacion, caracteristicas, fecha });
    await nuevoTree.save();
    req.flash("success_msg", "El árbol fue registrado.");

    // Redireccionar a la página del mapa
    res.redirect('/mapa');
  }
};

treesCtrl.renderMapa = async (req, res) => {
  const arboles = await Trees.find();
  res.render("mapa", { arboles });
};

treesCtrl.signin = passport.authenticate("local", {
  successRedirect: "/trees",
  failureRedirect: "/trees",
  failureFlash: true
});

treesCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Has cerrado sesión correctamente.");
  res.redirect("/trees");
};

module.exports = treesCtrl;



