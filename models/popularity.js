export default (sequelize, DataTypes) => {
    const Popularity = sequelize.define("Popularity", {
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName : "Popularity"
    });

    Popularity.associate = (models) => {
        // Relasi ke Post
        Popularity.belongsTo(models.Post, { foreignKey: "PostId" });
    }
    return Popularity;
}