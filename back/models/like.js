'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsToMany(models.User, {
        through: models.Like,
        as: "usersLikes",
        foreignKey: "postId",
        otherKey: 'userId'
      });
      
      models.User.belongsToMany(models.Post, {
        through: models.Like,
        as: "postsLikes",
        foreignKey: "userId",
        otherKey: "postId"
      });

      models.Like.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: "userId"
        }
      })

      models.Like.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false,
          name: "postId"
        }
      })
    }
  };
  Like.init({
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
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};