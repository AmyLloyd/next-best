const router = require('express').Router();
const { User, BlogPost, Tag } = require('../../models');

//GET all blogPosts
router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll();
        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports=router;