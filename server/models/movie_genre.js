'use strict';

module.exports = (sequelize,DataTypes) =>{
    var MovieGenre = sequelize.define('MovieGenre',{
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
            validate: {notEmpty:{msg:'ID required'}},
            unique:true,
            notNull:true
        }
    },{
        underscored:true,
        freezeTableName:true
    });

    MovieGenre.associate = function (models) {

    };
    return MovieGenre;
};