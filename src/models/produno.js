const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  name: String,
  title: String,
  image: String,
  imagedos: String,
  imagetres: String,
  description: String,
  filtro: String,
  enstock:String,
  coloruno: String,
  colordos: String,
  colortres: String,
  colorcuatro: String,
  colorcinco: String,
  colorseis: String,
  colorsiete: String,

  talleuno: String,
  talledos: String,
  talletres: String,
  tallecuatro: String,
  tallecinco: String,
  talleseis: String,
  tallesiete: String,
  oldprice: Number, 
  price: Number,
  dolarprice: Number,
  amount: Number,
  like: {
    type: Boolean,
    default: false
  },

  status: {
    type: Boolean,
    default: false
  } 
});

module.exports = mongoose.model('Produno', NoteSchema);
