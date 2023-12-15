const { UUIDV4, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
       allowNull: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'author',
        key: 'id',
      },
    },
    date_created: {
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    comment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'comment',
            key: 'id',
        },
    },
    tag_id: {
        type:DataTypes.INTEGER,
        references: {
            model: 'tag',
            key: 'id',
        },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comment_author: {
      type: DataTypes.INTEGER,
      references: {
        model: 'author',
        key: 'id',
      },
    },
    comment_created: {
      type:DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'library_card',
  }
);

module.exports = BlogPost;
