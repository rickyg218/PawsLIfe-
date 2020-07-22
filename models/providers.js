module.exports = function (sequelize, DataTypes) {
    var Provider = sequelize.define("Provider", {
        Message: {
            type: DataTypes.text,
            allowNull: false,
            validate: {
                len: [1]
            }
        },