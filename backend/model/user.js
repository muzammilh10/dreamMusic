const mongoose = require('mongoose');


// Extend the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    playlists: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Playlist",
        },
    ],

});

const User = mongoose.model("user", userSchema);

module.exports = User;
