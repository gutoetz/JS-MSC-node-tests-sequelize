const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      displayName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: "users",
      underscored: true,
    }
  );

  return User;
};
module.exports = userModel;
