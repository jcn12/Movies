'use strict';

module.exports = (sequelize,DataTypes) =>{
    var Genre = sequelize.define('Genre',{
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
            validate: {notEmpty: {msg:'Name required'}}
        }
    },{
        underscored:true,
        freezeTableName:true
    });

    Genre.associate = function (models) {
        models.Genre.belongsToMany(models.Movie,{through:models.MovieGenre});
    };
    return Genre;
};