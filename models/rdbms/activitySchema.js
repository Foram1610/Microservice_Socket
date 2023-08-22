module.exports = (sequelize, DataTypes) => {
    return sequelize.define('activities', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: DataTypes.STRING,
        message: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM(['active', 'inactive', 'deleted']),
            defaultValue: "active"
        },
    },
        {
            sequelize,
            tableName: "activities",
            modelName: "activities",
            freezeTableName: true,
            timestamps: true,
        });


}
