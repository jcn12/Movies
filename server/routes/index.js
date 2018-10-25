var createError = require('http-errors');
var express = require('express');
var router = express.Router();

var models = require('../models/index.js');



const isNumber = /^[0-9]+$/;

/* GET home page. */
router.get('/', function(req, res, next) {

    let page = 1;
    if (req.query.page && req.query.page.match(isNumber)) {
        page = req.query.page;
    }
    models.Movie.findAll({
        order:[['air_date','DESC']],
    },{
        limit:20,
        offset:page * 20
    }).then(movies=> {
        moviesView(movies,'',page,res);
    });
});

/* GET movie page. */
router.get('/Movie/:id', function(req, res, next) {
    models.Movie.findOne({
        where:{
            id:req.params.id
        },
        include:[models.Director,models.Writer,models.Genre,models.Cast]


    }).then(movie =>{
        if (movie != null) {
            data = {
                id:movie.id,
                title:movie.dataValues.title,
                cover:movie.cover,
                air_date:movie.dataValues.air_date,
                rating:movie.dataValues.rating,
                directors:movie.Directors ? movie.Directors.map(director=>{
                    return {
                        name:director.dataValues.name,
                        url:'/director/' + director.dataValues.id
                    }
                }) : null,
                writers:movie.Writers ? movie.Writers.map(writer=>{
                    return {
                        name:writer.dataValues.name,
                        url:'/Writer/' + writer.dataValues.id
                    }
                }) : null,
                genres:movie.Genres ? movie.Genres.map(genre=>{
                    return {
                        name:genre.dataValues.name,
                        url:'/Genre/' + genre.dataValues.id
                    }
                }) : null,
                casts:movie.Casts ? movie.Casts.map(cast=>{
                    return {
                        name:cast.dataValues.name,
                        url:'/cast/' + cast.dataValues.id
                    }
                }) : null,
            };
            res.render('movie_detail', {movie: data});
        }else{
            next(createError(404));
        }
    });
});

/* GET type list page. */
var types = ['Genre','Cast','Director','Writer'];
types.forEach(type=>{
    var model = models[type];
    router.get('/' + type,function (req,res,next) {
        listView(model,type,res);
    });
    router.get('/' + type + '/:id',function (req,res,next) {
        let page = 1;
        if (req.query.page && req.query.page.match(isNumber)) {
            page = req.query.page;
        }
        model.findOne({
            where:{
                id:req.params.id
            },
            include:{
                model:models.Movie
            }
        }).then(item=>{
            if (item != null){
                moviesView(item.Movies,'/'+type + '/' + req.params.id,page,res);
            }else{
                next(createError(404));
            }
        });
    })
});

/* List page view. */
var listView = function(model, type, res) {
    model.findAll({
        include: {
            model: models.Movie
        }
    }).then(items => {
        var formattedData = items.map(item => {
            return {
                name: item.dataValues.name,
                url: '/' + type + '/' + item.dataValues.id,
                count: item.Movies.length
            }
        });
        // sort with movie count
        formattedData.sort((a, b) => {
            return b.count - a.count;
        });
        res.render('category', {title: type, data: formattedData});
    });
};

/* Movie's list page view. */
var moviesView = function(movies,url,page,res){
    var formattedMovies = movies.map((movie) =>{
        return{
            id:movie.dataValues.id,
            title: movie.dataValues.title,
            cover: movie.dataValues.cover,
        }
    });

    res.render('index', {
        movies:formattedMovies,
        currentUrl:url,
        currentPage:page,
        totalPages:Math.ceil(formattedMovies.length/20),
        totalItems:formattedMovies.length
    })
};

module.exports = router;
