const express = require('express');
const { getAll, getOne, updateOne, protect } = require('./../controller/playerController')
const Playlist = require('./../model/playlist');


const router = express.Router()


// router.post('/',updateOne)
router.get('/:id', getOne(Playlist))
router.get('/', getAll(Playlist))
router.put('/:id', updateOne(Playlist))

router.get('/userPlaylist/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const playlists = await Playlist.find({ user: userId });

    if (playlists.length === 0) {
      return res.status(404).json({ message: 'No playlists found for this user' });
    }

    res.status(200).json({
      status: 'success',
      data: playlists
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.use(protect);

router.post('/', async (req, res) => {
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

    await playlist.save();

    const playlists = await Playlist.find({ user: userId });

    // Find the user and add the playlist to their playlists array
    if (!playlist) {
      return res.status(404).json({ message: 'playlist not found' });
    }

    // Respond with the updated user object or a success message
    res.status(201).json({ message: 'Playlist created and added to user', playlist: playlists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;  