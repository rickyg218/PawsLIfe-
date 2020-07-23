module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer");  
  Customer.associate = function(models) {
      Customer.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
      Customer.hasMany(models.Pet, {
          onDelete: "cascade"
      })
    };
   return Customer;
 };