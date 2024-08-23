const express = require('express');
const {getAll,getOne, updateOne} = require('./../controller/playerController')
const Playlist = require('./../model/playlist')

const router = express.Router()


// router.post('/',updateOne)
router.get('/:id',getOne(Playlist))
router.get('/',getAll(Playlist))
router.put('/:id',updateOne(Playlist))

module.exports = router;  