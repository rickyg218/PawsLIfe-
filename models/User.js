const { Sequelize } = require(".");

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
      //lat: Sequelize.DECIMAL,
      //long: Sequelize.DECIMAL
    });  
   /* Owner.associate = function(models) {
      Owner.hasMany(models.Pets, {
        onDelete: "cascade"
      });
      Owner.hasMany(models.Ratings, {
        onDelete: "cascade"
      });
    };*/
    return User;
  };