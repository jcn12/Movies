var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var models = require('../models/index.js');
var data_import = require('../controllers/data_import.js');

router.get('/',function (req,res,next) {
    res.render('update');
});

router.post('/',function (req,res,next) {
    let file = req.files.filetoupload;
    if(!file)
        next(createError(400));

    let val = JSON.parse(file.data);

   data_import.json_build(val,function ( iscreate,code) {
       models.Movie.findOne({
           where:{code : code}
       }).then(movie=>{
           res.render('update',{success:iscreate,movie:movie});
       })
    });
});

module.exports = router;