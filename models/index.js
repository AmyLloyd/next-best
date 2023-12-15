const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment=require('./Comment')

// A blogpost only has one user


//A user has many blogposts
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});


BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
});

//blogPost has many tags
BlogPost.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
})
Comment.belongsTo(User, {
    foreignKey:'user_id'
})

module.exports={ User, BlogPost, Comment}