const sequelize = require('../config/connection');
const { User, BlogPost, Tag } = require('../models');

const blogpostData = require('./blogPostData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();