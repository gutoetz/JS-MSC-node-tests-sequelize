const postCategoriesModel = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
      "PostCategory",
      {
        postId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            foreignKey: true,
            primaryKey: true,
          },
          categoryId: {
            allowNull: false,
            foreignKey: true,
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
      },
      {
        timestamps: false,
        tableName: "posts_categories",
        underscored: true,
      }
    );
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    })
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    })
  }
    return PostCategory;
  };
  module.exports = postCategoriesModel;
  