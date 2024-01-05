const router = require('express').Router();
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
        //Serialise data so the template can read it
        const blogposts = blogPostData.map((blogpost) => blogpost.get( {plain: true }));

        //Pass serialised data and session flag into template
        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in
        });

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
                {
                    model: Comment,
                    attributes: [
                        //check this reference
                        'user_id'
                    ]
                }
            ],
        });

        const blogpost = blogPostData.get({ plain:true });

        res.render('blogpost', {
            ...blogpost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
