'use strict';

module.exports = (sequelize,DataTypes) =>{
    var MovieDirector = sequelize.define('MovieDirector',{
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

    MovieDirector.associate = function (models) {

    };
    return MovieDirector;
};