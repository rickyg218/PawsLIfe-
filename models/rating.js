module.exports = function(sequelize, DataTypes) {
    var Rating = sequelize.define("Rating", {
        service_name: {
            type:DataTypes.STRING,
            allowNull: false,
        },  
        text_review: {
            type:DataTypes.STRING,
            allowNull: false,
        },  
        rating: {
            type:DataTypes.INTEGER,
            allowNull: false,
        }
        }); 
        Rating.associate = function(models) {
          Rating.belongsTo(models.Post, {
         
          });
          Rating.belongsTo(models.Pet, {

          });
          Rating.belongsTo(models.User, {

          });
        };
    return Rating;
  };