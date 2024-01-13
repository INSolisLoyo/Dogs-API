const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    //definición del modelo Temperament

    sequelize.define('temperament', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }     
    },
    {
        timestamps: false,
    }
    )
};