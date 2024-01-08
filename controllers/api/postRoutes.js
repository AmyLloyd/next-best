const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Create new blog

router.post('/:id', withAuth, async (req, res) => {
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

module.exports = router;