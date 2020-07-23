module.exports = function(sequelize, DataTypes) {
   var Rating = sequelize.define("Rating", {
      service_name: {
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
      },  
      text_review: {
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
      },  
      rating: {
          type:DataTypes.INTEGER,
          allowNull: false,
          validate: {
            max: 4,
            min: 1
          }
      }
      }); 
      Rating.associate = function(models) {
        Rating.belongsTo(models.Provider, {
          foreignKey: {
            allowNull: true
          }
        });
        Rating.belongsTo(models.Pet, {
          foreignKey: {
            allowNull: true
          }
        });
        Rating.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
     return Rating;
   };