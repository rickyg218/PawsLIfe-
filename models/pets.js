//const { Sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {
      first_name: {
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
      },
      last_name: {
          type:DataTypes.STRING,
          allowNull: true,
          validate: {
            len: [1]
          }
      },
      special_care: {
        type:DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [1]
        }
    },
      pet_type: {
          type:DataTypes.STRING,
          allowNull: false,
      },
       breed: {
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1],
          }
        },
      size: {
        type:DataTypes.STRING,
        allowNull: false,
      },
      temperment: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      picture: {
        type:DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
      },
      age: {
        type:DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 23, 
            min: 0
        }
      },
    });  
    Pet.associate = function(models) {
        Pet.belongsTo(models.Customer, {
          foreignKey: {
            allowNull: false
          }
        });
        Pet.hasMany(models.Rating, {
          onDelete: "cascade"
      })
      };
    return Pet;
  };