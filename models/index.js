const User = require('./User');
const BlogPost = require('./BlogPost');

// A blogpost only has one user
BlogPost.hasOne(User, { 
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
});


User.belongsTo(BlogPost, {
    foreignKey: 'author_id',
});

//A user has many blogposts
User.hasMany(BlogPost, {
    foreignKey: 'blogposts',
    onDelete: 'CASCADE',
});


BlogPost.belongsTo(User, {
    foreignKey: 'blogpost',
});

//blogPost has many tags
BlogPost.hasMany(Tag, {
    foreignKey: 'tag_id',
    onDelete: 'CASCADE',
})

Tag.belongsTo(BlogPost, {
    foreignKey: 'tag_id',
})
