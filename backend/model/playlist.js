
const mongoose = require('mongoose');
const { Schema } = mongoose;

// [
//   {
//     "uniqueId": 1,
//     "name": "Playlist1",
//     "songs": [
//       {
//         "title": "Purple - YellowFlower",
//         "artist": "A.R Rahaman",
//         "duration": "00:00",
//         "image": "https://images.pexels.com/photos/670741/pexels-photo-670741.jpeg?auto=compress&cs=tinysrgb&w=640&h=380&dpr=1"
//       },
//       {
//         "title": "Purple - YellowFlower",
//         "artist": "A.R Rahaman",
//         "duration": "00:00",
//         "image": "https://images.pexels.com/photos/670741/pexels-photo-670741.jpeg?auto=compress&cs=tinysrgb&w=640&h=380&dpr=1"
//       },
//       {
//         "title": "Purple - YellowFlower",
//         "artist": "A.R Rahaman",
//         "duration": "00:00",
//         "image": "https://images.pexels.com/photos/670741/pexels-photo-670741.jpeg?auto=compress&cs=tinysrgb&w=640&h=380&dpr=1"
//       },
//       {
//         "title": "Purple - YellowFlower",
//         "artist": "A.R Rahaman",
//         "duration": "00:00",
//         "image": "https://images.pexels.com/photos/670741/pexels-photo-670741.jpeg?auto=compress&cs=tinysrgb&w=640&h=380&dpr=1"
//       }
//     ]
//   }
// ]

const songSchema = new Schema({
  image: String,
  title: String,
  artist: String, // Make sure this matches your input data
  duration: String, // Change to String if needed
  path: String
});

const playlistSchema = new Schema({
  uniqueId: Number,
  name: {
    type: String,
    required: true,
  },
  songs: [songSchema],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
