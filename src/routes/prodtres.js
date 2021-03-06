const express = require('express');
const router = express.Router();
 

// Models
const Prodtres = require('../models/prodtres');
const Cart = require('../models/cart');
  
// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/buzos/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodtres
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodtres) => {
    Prodtres.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodtres/prodtres', {
        prodtres,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});





router.post('/prodtres/new-prodtres',  async (req, res) => {
  const { 
    name,
    title,
    image,
    imagedos,
    imagetres,
    imagecuatro,
    imagecinco,
    description,
    filtro,
    enstock,
    color,
    coloruno,
    colordos,
    colortres,
    colorcuatro,
    colorcinco,
    colorseis,
    talleuno,
    talledos,
    talletres,
    tallecuatro,
    tallecinco,
    talleseis,
    tallesiete,
    oldprice,
    price,
    dolarprice
  } = req.body;
  const errors = [];
  if (!image) {
    errors.push({text: 'Please Write a Title.'});
  }
  if (!title) {
    errors.push({text: 'Please Write a Description'});
  }
  if (!price) {
    errors.push({text: 'Please Write a Description'});
  }
  if (errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      image,
      title,
      price
    });
  } else {
    const newNote = new Prodtres({ 
      name,
      title,
      image,
      imagedos,
      imagetres,
      imagecuatro,
      imagecinco,
      description,
      filtro,
      enstock,
      color,
      coloruno,
      colordos,
      colortres,
      colorcuatro,
      colorcinco,
      colorseis,
      talleuno,
      talledos,
      talletres,
      tallecuatro,
      tallecinco,
      talleseis,
      tallesiete,
      oldprice,
      price,
      dolarprice
    });
    //newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/prodtresback/1');
  }
});






router.get('/buzos-detalles/:id', async (req, res) => {
  const { id } = req.params;
  const prodtres = await Prodtres.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('prodtres/prodtresredirect', {
    prodtres,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});




 ////////////////////////////like////////////////////////

 router.get('/likeprodtres/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Prodtres.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});



// New product
router.get('/prodtresback/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  Prodtres
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodtres) => {
    Prodtres.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodtres/new-prodtres', {
        prodtres,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});






router.post("/filtroprodtres", function(req, res){
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 15;
  let page = req.params.page || 1;

  var flrtName = req.body.filtroprod;

  if(flrtName!='' ) {

    var flterParameter={ $and:[{ filtro:flrtName},
      {$and:[{},{}]}
      ]
       
    }
    }else{
      var flterParameter={}
  }
  var prodtres = Prodtres.find(flterParameter);
  prodtres
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    prodtres.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("prodtres/prodtres",
      {
        prodtres: data, 
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice
      });
    });
  });
});






// talle y color
router.get('/prodtres/tallecolor/:id',  async (req, res) => {
  const prodtres = await Prodtres.findById(req.params.id);
  res.render('prodtres/tallecolor-prodtres', { prodtres });
});

router.post('/prodtres/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtres.updateOne({_id: id}, req.body);
  res.redirect('/prodtresredirect/' + id);
});




//editar


router.get('/prodtres/edit/:id',  async (req, res) => {
  const prodtres = await Prodtres.findById(req.params.id);
  res.render('prodtres/edit-prodtres', { prodtres });
});

router.post('/prodtres/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtres.updateOne({_id: id}, req.body);
  res.redirect('/prodtresback/1');
});




// Delete 
router.get('/prodtres/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodtres.deleteOne({_id: id});
  res.redirect('/prodtresback/1');
});







router.post('/addtocardprodtres/:id', async function(req, res, next){
 
  const { id } = req.params;
  await Prodtres.updateOne({_id: id}, req.body);
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodtres.findById(productId,async function(err, product){
    if(err){
      return res-redirect('/');
    }
 
      cart.add(product, product.id);
      req.session.cart = cart;
  

    console.log(req.session.cart);
    req.flash('success', 'Producto agregado al carro exitosamente');
     res.redirect('/shopcart');
  });
});



module.exports = router;
 