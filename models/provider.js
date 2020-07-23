module.exports = function(sequelize, DataTypes) {
    var Provider = sequelize.define("Provider");  
    Provider.associate = function(models) {
        Provider.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
     return Provider;
   };