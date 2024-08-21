const express = require('express');
const {getAll,getOne} = require('./../controller/playerController')
const Playlist = require('./../model/playlist')

const router = express.Router()


// router.post('/',updateOne)
router.get('/:id',getOne(Playlist))
router.get('/',getAll(Playlist))

module.exports = router;  