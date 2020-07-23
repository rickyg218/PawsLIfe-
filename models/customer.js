module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        customer: DataTypes.STRING
    });  
    Customer.associate = function(models) {
        Customer.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
     return Customer;
   };