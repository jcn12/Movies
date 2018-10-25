'use strict';

module.exports = (sequelize,DataTypes) =>{
    var MovieWriter = sequelize.define('MovieWriter',{
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

    MovieWriter.associate = function (models) {

    };
    return MovieWriter;
};