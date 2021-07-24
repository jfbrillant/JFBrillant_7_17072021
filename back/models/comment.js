'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsToMany(models.User, {
        through: models.Comment,
        as: "users",
        foreignKey: "postId",
        otherKey: 'userId'
      });
      
      models.User.belongsToMany(models.Post, {
        through: models.Comment,
        as: "posts",
        foreignKey: "userId",
        otherKey: "postId"
      });

      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: "userId"
        }
      })

      models.Comment.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false,
          name: "postId"
        }
      })
    }
  };
  Comment.init({
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};