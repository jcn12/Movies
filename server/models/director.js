'use strict';

module.exports = (sequelize,DataTypes) =>{
    var Director = sequelize.define('Director',{
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
        }
    },{
        underscored:true,
        freezeTableName:true
    });

    Director.associate = function (models) {
        models.Director.belongsToMany(models.Movie,{through:models.MovieDirector});
    };
    return Director;
};