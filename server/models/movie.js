'use strict';

module.exports = (sequelize,DataTypes) =>{
    var Movie = sequelize.define('Movie',{
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
            validate: {notEmpty:{msg:'ID required'}},
            unique:true,
            notNull:true
        },
        title:{
            type:DataTypes.TEXT,
            validate: {notEmpty: {msg:'Title required'}},
            unique: false
        },
        cover:{
            type:DataTypes.TEXT,
            unique:true
        },
        air_date:{
            type:DataTypes.TEXT,
        },
        runtimes:{
            type:DataTypes.INTEGER
        },
        samples:{
            type:DataTypes.TEXT
        },
        rating:{
            type:DataTypes.REAL
        }
    },{
        underscored:true,
        freezeTableName:true,
        getterMethods:{
            // localCover:function () {
            //     return '/' + this.code + '/' + this.cover.split('/').pop()
            // },
            // localSample:function () {
            //     return this.samples.split(',').map(sample=>{
            //         return '/' + this.code + '/' + sample.split('/').pop()
            //     })
            // },
            // localPaths:function () {
            //     if(this.path){
            //         return this.path.split(',').map(name=>{
            //             return '/' + this.code + '/' + name
            //         });
            //     }else{
            //         return null;
            //     }
            // }
        }
    });

    Movie.associate  = function (models) {
        // model.Movie.hasMany(models.Task);
        models.Movie.belongsToMany(models.Genre,{through:models.MovieGenre});
        models.Movie.belongsToMany(models.Cast,{through:models.MovieCast});
        models.Movie.belongsToMany(models.Writer,{through:models.MovieWriter});
        models.Movie.belongsToMany(models.Director,{through:models.MovieDirector});


    };

    return Movie;
};