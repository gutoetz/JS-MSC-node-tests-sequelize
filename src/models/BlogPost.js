const blogPostsModel = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define(
      "BlogPost",
      {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          title: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          content: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            field: 'user_id',
            references: {
              model: 'users',
              key: 'id',
            }},
          published: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
          },
          updated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
          }
      },
      {
        timestamps: false,
        tableName: "blog_posts",
        underscored: true,
      },
    );
    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, {
        foreignKey: 'userId', 
        as: 'users'
      })
    }
    return BlogPost;
  };
  module.exports = blogPostsModel;
  