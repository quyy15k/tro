'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class History extends Model {
        static associate(models) {
            History.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });
            History.belongsTo(models.Post, {
                foreignKey: 'postId',
                targetKey: 'id',
                as: 'post',
            });
        }
    }

    History.init({
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            }
        },
        postId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Posts',
                key: 'id',
            }
        },
    }, {
        sequelize,
        modelName: 'History',
    });

    return History;
};
