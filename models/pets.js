module.exports = function(sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {
      first_name: {
          type:DataTypes.STRING,
          allowNull: false,
      },
      special_care: {
        type:DataTypes.STRING,
        allowNull: true,
    },
      pet_type: {
          type:DataTypes.STRING,
          allowNull: false,
      },
       breed: {
          type:DataTypes.STRING,
          allowNull: true,
        },
      size: {
        type:DataTypes.STRING,
        allowNull: false,
      },
      temperment: {
        type:DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type:DataTypes.STRING,
        allowNull: true,
      },
      age: {
        type:DataTypes.STRING,
        allowNull: false,

      },
    });  
    Pet.associate = function(models) {
        Pet.belongsTo(models.User, { as: "Customer", foreignKey : "CustomerId" });
      };
    return Pet;
  };
