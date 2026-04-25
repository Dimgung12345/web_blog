export default (sequelize, DataTypes) => {
  const Media = sequelize.define("Media", {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM("image", "video"),
      allowNull: false
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: true
    }
    // createdAt & updatedAt otomatis ada
  }, {});

  Media.associate = (models) => {
    // Relasi ke Post
    Media.belongsTo(models.Post, { foreignKey: "PostId" });
  };

  return Media;
};
