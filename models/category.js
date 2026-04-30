export default (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    }
    // createdAt & updatedAt otomatis ada
  }, {});

  Category.associate = (models) => {
    // Relasi: Category punya banyak Post
    Category.hasMany(models.Post, { foreignKey: "CategoryId" });
  };

  return Category;
};
