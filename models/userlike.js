export default (sequelize, DataTypes) => {
    const UserLike = sequelize.define("UserLike", {
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        PostId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "UserLikes",
        indexes: [
            {
                unique: true,
                fields: ["UserId", "PostId"]
            }
        ]
    });

    UserLike.associate = (models) => {
        UserLike.belongsTo(models.User, { foreignKey: "UserId" });
        UserLike.belongsTo(models.Post, { foreignKey: "PostId" });
    };

    return UserLike;
};
