module.exports = function(sequelize, DataTypes) {
  var Provider = sequelize.define("Provider");  
  Provider.associate = function(models) {
    Provider.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
      //TODO: need to find out why this doesn't work, thought I was calling the.
      // Provider.hasMany(models.Post, {
      //     onDelete: "cascade"
      // })
    };
   return Provider;
 };