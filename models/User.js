module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      first_name: {
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
      },
      last_name: {
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
      },
      user_name: {
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
      },
      password: {
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [8, 16],
            isInt: true,
            isLowercase: true,       
            isUppercase: true
          }
      },
       phone: {
          type:DataTypes.INTEGER,
          allowNull: false,
          validate: {
            len: [10, 10],
          }
        },
      email: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        }
      },
      lat: {
        type:DataTypes.DECIMAL,
        allowNull: false,
      },
      long: {
        type:DataTypes.DECIMAL,
        allowNull: false,
      },
    });
    User.associate = function(models) {
      User.hasMany(models.Customer, {
        onDelete: "cascade"
      });
      User.hasMany(models.Provider, {
        onDelete: "cascade"
      });
      User.hasMany(models.Rating, {
        onDelete: "cascade"
      });
    };
    console.table(User);
    return User;
  };