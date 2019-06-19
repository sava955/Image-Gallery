const express = require('express');
const Album = require('../models/album');
const Post = require('../models/post');

const router = express.Router();

router.post('', (req, res, next) => {
    const album = new Album({
        name: req.body.name,
        description: req.body.description
    });
    album.save().then(createdAlbum => {
        res.status(201).json({
            message: 'Album created!',
            album: {
                ...createdAlbum,
                id: createdAlbum._id
            }
        });
    });
});

router.put('/:id', (req, res, next) => {
    const album = new Album({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description
    });
    Album.updateOne({ _id: req.params._id }, album).populate('posts').then(result => {
        res.status(200).json({ message: 'Album updated!' });
    });
});

router.get('', (req, res, next) => {
    Album.find().populate('posts', 'image').then(documents => {
        res.status(200).json({
            message: 'Albums fetched successfuly!',
            albums: documents
        });
    });
});

router.get('/:id', (req, res, next) => {
    const albumId = req.params.id;

    Album.findById(albumId).populate('posts').then(album => {
        if (album) {
            res.status(201).json(album);
        }
        else {
            res.status(404).json({ message: 'Album not found!' });
        }
    });
});

module.exports = router;