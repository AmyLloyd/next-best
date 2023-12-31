const sequelize = require('../config/connection')
const { User, BlogPost, Comment } = require('../models');

const blogpostData = require('./blogPostData.json');
const userData = require('./userData.json');
const commentData= require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
  });
  
  console.log("--------USER SEEDED-------");

  await BlogPost.bulkCreate(blogpostData);
  console.log("--------BLOGPOST SEEDED-------");

  await Comment.bulkCreate(commentData);
  console.log("--------COMMENT SEEDED-------");

  process.exit(0);
};

seedDatabase();