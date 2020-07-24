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
        allowNull: true,
      },

      long: {
        type:DataTypes.DECIMAL(9,4),
        allowNull: true
      }

    });
    User.associate = function(models) {
      User.hasMany(models.Pet, {
        as: "Customer",
        onDelete: "cascade"
      });
      User.hasMany(models.Post, {
        as: "Provider",
        onDelete: "cascade"
      });
    };
    console.table(User);
    return User;
  };
