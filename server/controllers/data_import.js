const fs = require('fs');
const path = require('path');
const models = require('../models/index');

const jsonfile = 'resource/movies.json';

exports.json_import  = function(){

    (async ()=>{
        var list = JSON.parse(fs.readFileSync(jsonfile));
        for (var j =0;j <list.length;j++){
            var json = list[j];
            var movie = await models.Movie.create({
                title: json['Title'],
                cover: json['Cover'],
                air_date: json['Date'],
                runtimes: json['Runtimes'],
                samples:  json['Samples'] ? json['Samples'].toString():'',
                rating: json['Rating']
            });
            if (json['Directors'] != null){
                var directors = json['Directors'];
                for (var i =0; i <directors.length; i++){
                    var director = await models.Director.findOrCreate({where:{name:directors[i]}});
                    await director[0].addMovie(movie);
                    await movie.addDirector(director[0]);
                }
            }
            if (json['Casts'] != null){
                var casts = json['Casts'];
                for (var i =0; i < (casts.length > 3 ? 3:casts.length); i++){
                    var cast = await models.Cast.findOrCreate({where:{name:casts[i]}});
                    await cast[0].addMovie(movie);
                    await movie.addCast(cast[0]);
                }
            }
            if (json['Genres'] != null){
                var genres = json['Genres'];
                for (var i = 0;i < genres.length;i++){
                    var genre = await models.Genre.findOrCreate({where:{name:genres[i]}});
                    await genre[0].addMovie(movie);
                    await movie.addGenre(genre[0]);
                }
            }
            if (json['Writers'] != null){
                var writers = json['Writers'];
                for (var i = 0;i < writers.length;i++){
                    var writer = await models.Writer.findOrCreate({where:{name:writers[i]}});
                    await writer[0].addMovie(movie);
                    await movie.addWriter(writer[0]);
                }
            }
        }
    })();
};

