const express = require('express');
const User = require('./../model/user')
const jsonWeb = require('jsonwebtoken');
const Playlist = require('../model/playlist');
const { getOne, protect } = require('../controller/playerController');
const router = express.Router()



async function generateToken(id) {
  let token = jsonWeb.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  })
  return token
}


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username }).populate('playlists');;
    if (!user) {
      user = await User.findOne({ email: username }).populate('playlists');;
    }
    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    else {
      if (user.password !== password) {
        return res.json({ success: false, message: "Invalid Credentials" });
      } else {
        let token = await generateToken(user._id)

        return res.json({ success: true, token, user, message: "Logged In Succesfully" });
      }
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;

  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }
  const user = await User.create(req.body);


  try {
    if (user) {
      let token = await generateToken(user._id)
      res.json({ success: true, message: "User Created", user, token });
    } else {
      res.json({ success: false, message: "User Creation Error" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal error" });
  }
});





router.use(protect);

router.post('/', getOne(User, Playlist))

router.post('/playlists', async (req, res) => {
  try {

    const userId = req.user._id;
    const { name, songs } = req.body;

    // Create a new playlist
    const playlist = new Playlist({
      uniqueId: Date.now(),
      name,
      songs,
      user: userId
    });

    // Save the playlist to the database
    const savedPlaylist = await playlist.save();

    // Find the user and add the playlist to their playlists array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.playlists.push(savedPlaylist._id);
    await user.save();

    // Respond with the updated user object or a success message
    res.status(201).json({ message: 'Playlist created and added to user', playlist: savedPlaylist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;