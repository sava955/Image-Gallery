const express = require('express');
const multer = require('multer');
const Post = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if(isValid) {
            error = null;
        }
        cb(error, 'backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname
          .toLowerCase()
          .split(' ')
          .join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post('', multer({storage: storage}).single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        image: url + '/images/' + req.file.filename
    });

    post.save().then(createdPost => {
        res.status(201).json({
            messages: 'Post added successfuly',
            post: {
                ...createdPost,
                id: createdPost._id
            }
        });
    });
});

router.put('/:id', multer({storage: storage}).single('image'),
   (req, res, next) => {
       let image = req.body.image;
       if (req.file) {
           const url = req.protocol + '://' + req.get('host');
           image = url + '/images/' + req.file.filename;
       }
       const post = new Post({
           _id: req.body.id,
           title: req.body.title,
           image: image
       });
       Post.updateOne({_id: req.params.id}, post).then(result => {
           res.status(200).json({message: 'Post updated!'});
       });
    });

router.get('', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Post fetched successfuly!',
            posts: documents
        });
    });
});

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(401).json({message: 'Post not found'});
        }
    });
});

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(
        result => {
            res.status(200).json({ message: 'Post deleted!' })
        }
    )
})

module.exports = router;