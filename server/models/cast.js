'use strict';

module.exports = (sequelize,DataTypes) =>{
    var Cast = sequelize.define('Cast',{
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
            validate: {notEmpty:{msg:'ID required'}},
            unique:true,
            notNull:true
        },
        name:{
            type:DataTypes.TEXT,
            validate: {notEmpty: {msg:'Name required'}},
            unique: true
        },
        image:{
            type:DataTypes.TEXT
        }
    },{
        underscored:true,
        freezeTableName:true
    });

    Cast.associate = function (models) {

        models.Cast.belongsToMany(models.Movie,{through:models.MovieCast});
    };
    return Cast;
};