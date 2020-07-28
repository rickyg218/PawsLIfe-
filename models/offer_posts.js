module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      title: {
          type:DataTypes.STRING,
          allowNull: false,
      },
      text: {
          type:DataTypes.TEXT,
          allowNull: false,

      },
      animal_type: {
          type:DataTypes.STRING,
          allowNull: false,
      },
      size_restrictions: {
        type:DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type:DataTypes.STRING,
        allowNull: false,

      },
      range: {
        type:DataTypes.STRING,
        allowNull: false,
 
      },
      picture: {
        type:DataTypes.STRING,
        allowNull: true,

      },
      service_type: {
        type:DataTypes.STRING,
        allowNull: false,

      },
      cost: {
        type:DataTypes.STRING,
        allowNull: true,

      },

    });  
    Post.associate = function(models) {
        Post.belongsTo(models.User,{
          as: "Provider",
          foreignKey: "ProviderId",
          });
        Post.belongsTo(models.User,{
          as: "Booker",
          foreignKey: "BookerId",
          });
      };
    return Post;
  };
