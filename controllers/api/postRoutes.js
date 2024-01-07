const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');

//Create new blog

router.post('/', async (req, res) => {
    try {
        const blogData = await BlogPost.create({
            title: req.body.title,
            body: req.body.body,
        });
    
        if (!blogData) {
            console.log("Incorrect title or post")
            res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
   
    res.status(200).json(blogData);
    } catch (err) {
    res.status(400).json(err);
    console.log(err, "err");
    }
});

module.exports=router;