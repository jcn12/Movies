'use strict';

module.exports = (sequelize,DataTypes) =>{
    var MovieCast = sequelize.define('MovieCast',{
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

    MovieCast.associate = function (models) {
        
    };
    return MovieCast;
};