var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

router.get('/basicInfo', function(req, res, next) {
  var db = req.db;
  var story = db.get('story');
  story.find({},{},function(e, data){
    res.render('basicInfo', { 
      title: 'Resumen de Vida',
      'list' : data
      });
  });
});

router.get('/skills', function(req, res, next) {
  var db = req.db;
  var skills = db.get('skills');
  skills.find({},{},function(e, data){
    res.render('skills', { 
      title: 'Habilidades',
      'list' : data
    });
  })
});

router.get('/portfolio', function(req, res, next) {
  res.render('portfolio', { title: 'Portfolio' });
});


module.exports = router;
