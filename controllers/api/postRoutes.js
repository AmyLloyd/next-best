const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Create new blog

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

module.exports=router;