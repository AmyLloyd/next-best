const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

console.log(process.env.DB_NAME, 'DB_NAME', process.env.DB_USER, 'DB_USER');

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}
const confirmSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) { 
    console.error("unable to connect to database:", error);
  }
};

confirmSequelize();

module.exports = sequelize;
