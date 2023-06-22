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

    const arbolId = nuevoTree.id;
    res.redirect(`/trees/mapa/${arbolId}`);

  }
};

treesCtrl.showTreeOnMap = async (req, res) => {
  try {
    const arbolId = req.params.arbolId;
    // Obtener los datos del árbol según el arbolId
    const arbol = await Trees.findById(arbolId);

    if (!arbol) {
      // Si no se encuentra el árbol, puedes mostrar un mensaje de error o redirigir a otra página
      res.redirect('/trees'); // Por ejemplo, redirigir a la página principal de los árboles
      return;
    }

    // Renderizar la vista del mapa y pasar los datos del árbol
    res.render('mapa', { arbol: arbol }); // Pasar los datos del árbol como { arbol: arbol }
  } catch (error) {
    // Manejar el error
    console.error(error);
    // Mostrar un mensaje de error o redirigir a otra página
    res.redirect('/trees'); // Por ejemplo, redirigir a la página principal de los árboles
  }
};

treesCtrl.renderMapa = async (req, res) => {
  const arbol = await Trees.find();
  res.render('mapa', { arbol });
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

treesCtrl.getTrees = async (req, res) => {
  try {
    const trees = await Trees.find();
    const treeData = trees.reduce((data, tree) => {
      data.push({ nombre: tree.nombre });
      return data;
    }, []);
    res.render('grafica', { treeData });
  } catch (error) {
    console.error(error);
    res.redirect('/trees');
  }
};


module.exports = treesCtrl;



