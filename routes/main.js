var router = require('express').Router()
var faker = require('faker')
var User = require('../models/user')
var moment = require('moment');

router.get('/', function(req, res, next) {
    var user={
        name: faker.name.firstName(),
        email: faker.internet.email(),
        phone: faker.random.number(),
        city: faker.address.city()
    }

    res.render('add_user',{user:user});
})

router.post('/added', function(req, res, next) {
    console.log("aaaaaa");
    console.log(req.body);
    User.findOne({},function(err,data){

        if (data) {
            c = data.id + 1;
        }else{
            c =1;
        }

    var user = new User({
        id:c,
        name : req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        city : req.body.city
    })

    user.save(function(err,succ) {
        if (err) {
            console.log(err);
        }else{
            console.log(succ);
            res.redirect('/')
        }
    })
    }).sort({_id: -1}).limit(1);
})

router.post('/products', function(req, res, next) {

    console.log(req.body);

    if(req.body.select!='undefined'){
        var sort=req.body.select;
    }

    var perPage = 9
    var page = req.body.page || 1

    //var search = req.body.search;
    console.log(req.body.search);
    console.log(req.body.search_field);

    if (req.body.search!=undefined && req.body.search_field!=undefined && req.body.search!='' && req.body.search_field!='') {
        console.log('if');
        var search = req.body.search;
        var search_field = req.body.search_field;
        var query = { 'search' : search_field };

        if (search == 'name') {
            var query = { name : search_field };
        }else if (search == 'email') {
            var query = { email : search_field };
        }else if (search == 'phone') {
            var query = { phone : search_field };
        }else if (search == 'city') {
            var query = { city : search_field };
        }else{
            var query = { id : search_field };
        }
        console.log(query);
    }else{
        var query = { 'name': { $ne: null } };
        console.log(query)
    }
    
    User.find(query).skip((perPage * page) - perPage).limit(perPage).sort(sort)
    .exec(function(err, user) {
            User.count(query).exec(function(err, count) {
                if (err) return next(err)
                res.render('user', {
                    user: user,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    sort:sort,
                    search:search,
                    moment:moment
                })
            })
        })
})

module.exports = router