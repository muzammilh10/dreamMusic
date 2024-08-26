
const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;


const songSchema = new Schema({
  image: String,
  title: String,
  artist: String, 
  duration: String, 
  path: String
});

const playlistSchema = new Schema({
  uniqueId: Number,
  name: {
    type: String,
    required: true,
  },
  songs: [songSchema],
  user: {
    type: ObjectId,
    ref: "User",
  },
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
