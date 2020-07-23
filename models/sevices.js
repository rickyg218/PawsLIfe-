module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      title: {
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
      },
      text: {
          type:DataTypes.TEXT,
          allowNull: false,
          validate: {
            len: [1, 1000]
          }
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
        validate: {
            len: [1]
        }
      },
      range: {
        type:DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      picture: {
        type:DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
      },
      service_type: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },

    });  
    Post.associate = function(models) {
        Post.belongsTo(models.Provider, {
          foreignKey: {
            allowNull: false
          }
        });
        Post.hasMany(models.Rating, {
          onDelete: "cascade"
        })
      };
    return Post;
  };