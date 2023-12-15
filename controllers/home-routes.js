const router = require('express').Router
const { User } = require('../models');


router.get('/', async (req, res) => {
    try {
        //Get all blogposts and JOIN with user data
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        res.status(200).json(blogPostData);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogs/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        res.status(200).json(blogPostData);

    } catch (err) {
        res.status(500).json(err);
    }
});
