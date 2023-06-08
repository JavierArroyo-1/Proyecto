const treesCtrl = {};
const Trees = require('../models/Trees');

treesCtrl.renderTreeForm = (req, res) => {
  res.render('/trees');
};

treesCtrl.saveTree = async (req, res) => {
  let errors = [];
  const { latitud, longitud, caracteristicas, nombre, fecha } = req.body;

  if (nombre != String) {
    errors.push({ text: "El nombre no debe contener números." });
  }

  if (latitud == String) {
    errors.push({ text: "La latitud debe ser un número." });
  }

  if (longitud == String) {
    errors.push({ text: "La longitud debe ser un número." });
  }

  if (fecha == String) {
    errors.push({ text: "La fecha debe ser un número." });
  }

  if (errors.length > 0) {
    res.render("/trees", {
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

    const nuevoTree = new Trees({ nombre, ubicacion, caracteristicas });
    await nuevoTree.save();
    req.flash("success_msg", "El árbol fue registrado.");

    // Enviar una notificación al cliente para agregar el árbol al mapa
    req.app.get("io").emit("agregarArbol", { nombre, caracteristicas, ubicacion });

    res.redirect("/trees");
  }
};

treesCtrl.renderMapa = async (req, res) => {
  const arboles = await Trees.find();
  res.render("mapa", { arboles });
};

treesCtrl.signin = passport.authenticate("local", {
  successRedirect: "/mapa",
  failureRedirect: "/trees",
  failureFlash: true
});

treesCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Has cerrado sesión correctamente.");
  res.redirect("/trees");
};

module.exports = treesCtrl;



