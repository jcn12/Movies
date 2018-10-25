'use strict';

module.exports = (sequelize,DataTypes) =>{
    var Writer = sequelize.define('Writer',{
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

    Writer.associate = function (models) {

        models.Writer.belongsToMany(models.Movie,{through:models.MovieWriter});
    };
    return Writer;
};