'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ward extends Model {
        static associate(models) {
            // Liên kết với District
            Ward.belongsTo(models.District, { foreignKey: 'districtCode', as: 'district' });
        }
    }
    Ward.init({
        code: DataTypes.STRING,
        value: DataTypes.STRING,
        districtCode: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Ward',
    });
    return Ward;
};