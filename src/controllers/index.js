const getIndexHandler = (req, res) => {
  res.render('index', { layout: 'layouts/main-layout', title: 'Class Support App | Home' });
};

module.exports = { getIndexHandler };
