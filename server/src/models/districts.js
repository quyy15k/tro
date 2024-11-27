'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class District extends Model {
        static associate(models) {
            // Liên kết với bảng Province
            District.belongsTo(models.Province, { foreignKey: 'provinceCode', as: 'province' });

            // Liên kết với bảng Ward
            District.hasMany(models.Ward, { foreignKey: 'districtCode', as: 'wards' });
        }
    }

    District.init({
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },
        provinceCode: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Provinces', // Tên bảng 'Provinces'
                key: 'code',
            },
        }
    }, {
        sequelize,
        modelName: 'District',
    });

    return District;
};
