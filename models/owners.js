module.exports = function(sequelize, DataTypes) {
    var Owner = sequelize.define("Owner", {
      name: {
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
      zipcode: {
          type:DataTypes.INTEGER,
          allowNull: false,
          validate: {
            max: 99999
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
          contains: "@"
        }
      }
    });  
   /* Owner.associate = function(models) {
      Owner.hasMany(models.Pets, {
        onDelete: "cascade"
      });
      Owner.hasMany(models.Ratings, {
        onDelete: "cascade"
      });
    };*/
    return Owner;
  };