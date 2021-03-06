const bcrypt = require("bcryptjs")

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      first_name: {
          type:DataTypes.STRING,
          allowNull: false,
      },
      last_name: {
          type:DataTypes.STRING,
          allowNull: false,
      },
      user_name: {
          type:DataTypes.STRING,
          allowNull: false,

      },
      password: {
          type:DataTypes.STRING,
          allowNull: false,
      },

      email: {
        type:DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type:DataTypes.DECIMAL(9,4),
        allowNull: true
      },
      long: {
        type: DataTypes.DECIMAL(9,4),
        allowNull:true
      }

    });

  //before you create the user, take the password that you have for the user and generate a random 10 character encryption
  User.beforeCreate(function(user){
      user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10),null);
  })


  User.associate = function(models) {
    User.hasMany(models.Pet, {
      as: "Customer",
      foreignKey: "CustomerId",
      onDelete: "cascade"
    });
    User.hasMany(models.Post, {
      as: "Provider",
      foreignKey: "ProviderId",
      onDelete: "cascade"

    });
    User.hasMany(models.Post, {
      as: "Booker",
      foreignKey: "BookerId",
      onDelete: "cascade"
    });
  };
  console.table(User);
  return User;
};
