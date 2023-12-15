const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// A blogpost only has one author
BlogPost.hasOne(Author, { 
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
});

Author.belongsTo(BlogPost, {
    foreignKey: 'author_id',
});

//An author has many blogposts
Author.hasMany(BlogPost, {
    foreignKey: 'blogposts',
    onDelete: 'CASCADE',
});

BlogPost.belongsTo(Author, {
    foreignKey: 'blogpost',
});

//blogPost has many comments
BlogPost.hasMany(Comment, {
    foreignKey: 'comments',
    onDelete: 'CASCADE',
});

Comment.belongsTo(BlogPost {
    foreignKey: 'comments',
})
