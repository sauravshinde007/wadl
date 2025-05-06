// models/Song.js

const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  Songname: String,
  Film: String,
  Music_director: String,
  singer: String,
  Actor: { type: String, default: '' },
  Actress: { type: String, default: '' }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
