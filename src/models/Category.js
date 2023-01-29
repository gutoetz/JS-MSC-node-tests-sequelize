const categoriesModel = (sequelize, DataTypes) => {
    const Category = sequelize.define(
      "Category",
      {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            allowNull: false,
            type: DataTypes.STRING,
          },
      },
      {
        timestamps: false,
        tableName: "categories",
        underscored: true,
      }
    );
  
    return Category;
  };
  module.exports = categoriesModel;
  