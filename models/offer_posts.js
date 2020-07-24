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
        type:DataTypes.INTEGER,
        allowNull: false,

      },
      range: {
        type:DataTypes.INTEGER,
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

    });  
    Post.associate = function(models) {
        Post.belongsTo(models.User);
        Post.belongsTo(models.User, {
          as: "Provider"
        });
      };
    return Post;
  };
