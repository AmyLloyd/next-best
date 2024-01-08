const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Create new blogpost

router.post('/', withAuth, async (req, res) => {
  try {
      const blogData = await BlogPost.create({
        title: req.body.title,
        body: req.body.content,
        user_id: req.session.user_id,
      });
 
      res.status(200).json(blogData);
  } catch (err) {
  res.status(400).json(err);
  }
});

//Update blogpost
router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await BlogPost.update({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
        
        if(!blogData) {
          res.status(404).json({ message: 'No blogpost with this id!'});
          return;
        }

        res.status(200).json(blogData);
    } catch (err) {
    res.status(500).json(err);
    }
});

//Post comment
router.post('/comment/:id', withAuth, async (req, res) => {
  try {
        const commentData = await Comment.create({
          comments: req.body.comment,
          user_id: req.session.user_id,
          where: {
            post_id: req.params.id,
          },
        })
      res.status(200).json(commentData);
  } catch (err) {
  res.status(400).json(err);
  }
});

module.exports = router;