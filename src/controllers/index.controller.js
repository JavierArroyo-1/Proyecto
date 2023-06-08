

const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};

indexCtrl.renderHome = (req, res) => {
  res.render('home');
};

indexCtrl.rendertrees = (req, res) => {
  res.render('trees');
};

indexCtrl.rendermapa = (req, res) => {
  res.render('mapa');
};
module.exports = indexCtrl;