export default (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pathID: {
      type: DataTypes.STRING,
      allowNull: true
    }
    // createdAt & updatedAt otomatis ada
  }, {});

  Post.associate = (models) => {
    Post.belongsTo(models.Category, { foreignKey: "CategoryId" });
    Post.hasMany(models.Media, { foreignKey: "PostId" });
    Post.belongsTo(models.User, { foreignKey: "UserId" });
  };

  return Post;
};
