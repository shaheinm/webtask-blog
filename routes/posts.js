var mongoose = require('mongoose');

const Posts = require('../models/posts');

module.exports = (app) => {
  app.get('/posts', (req, res) => {
      req.postsModel.find({}).sort({'created_at': -1}).exec((err, posts) => res.json(posts))
  });

  app.post('/posts', (req, res) => {
      const newPost = new req.postsModel(Object.assign({}, req.body, {created_at: Date.now()}));
      newPost.save((err, savedPost) => {
          res.json(savedPost)
      })
  })

  app.put('/posts', (req, res) => {
    const idParam = req.webtaskContext.query.id;
    req.postsModel.findOne({_id: idParam}, (err, postToUpdate) => {
        const updatedPost = Object.assign(postToUpdate, req.body);
        updatedPost.save((err, posts) => res.json(posts))
    })
  })

  app.delete('/posts', (req, res) => {
    const idParam = req.webtaskContext.query.id;
    req.postsModel.remove({_id: idParam}, (err, removedPost) => res.json(removedPost));
  })
}
