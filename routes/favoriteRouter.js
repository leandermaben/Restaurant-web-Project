const express=require('express');
const bodyParser=require('body-parser');
const authenticate=require('../authenticate');
const favoriteRouter = express.Router();
const Favorite=require('../models/favorites');
favoriteRouter.use(bodyParser.json());
favoriteRouter.route('/')
.get(authenticate.verifyUser,(req,res,next)=>{
    Favorite.find({user:req.user._id})
    .populate('user')
    .populate('dishes._id')
    .populate('dishes._id.comments.author')
    .then((favorite)=>{
        res.statusCode=200;
        res.json(favorite);
    });
})
.post(authenticate.verifyUser,(req,res,next)=>{
    Favorite.findOne({user:req.user._id}).then((favorite)=>{
        req.body=[... new Set(req.body)];
        if(!favorite){
            Favorite.create({
                user:req.user._id,
                dishes:req.body
            }).then((favorite)=>{
                res.statusCode=200;
                res.json(favorite);
            }).catch(err=>next(err));
        }else{
            for(var i=0;i<req.body.length;i++){
                if(!favorite.dishes.id(req.body[i]._id)){
                    favorite.dishes.push(req.body[i]);
                }       
            }
            favorite.save().then((fav)=>{
                res.statusCode=200;
                res.json(fav);
            });
        }
    }).catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT opreation not supported on /favorites.');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Favorite.findOneAndRemove({user:req.user._id}).then(favorite=>{
        res.statusCode=200;
        res.json(favorite);
    }).catch(err=>next(err));
});

favoriteRouter.route('/:dishId')
.get((req,res,next)=>{
    res.statusCode=403;
    res.end('GET opreation not supported on /favorites.');
})
.post(authenticate.verifyUser,(req,res,next)=>{
    Favorite.findOne({user:req.user._id}).then((favorite)=>{
        if(!favorite){
            Favorite.create({
                user:req.user._id,
                dishes:[req.params.dishId]
            }).then((favorite)=>{
                res.statusCode=200;
                res.json(favorite);
            }).catch(err=>next(err));
        }else{
            if(!favorite.dishes.id(req.params.dishId)){
                favorite.dishes.push(req.params.dishId);
            }
            favorite.save().then((fav)=>{
                res.statusCode=200;
                res.json(fav);
            });
        }
    }).catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT opreation not supported on /favorites.');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    console.log("Here");
    Favorite.findOne({user:req.user._id}).then(favorite=>{
        favorite.dishes.id(req.params.dishId).remove();
        favorite.save()
        .then(fav=>{
            res.statusCode=200;
            res.json(fav);
        });
    }).catch(err=>next(err));
});

module.exports=favoriteRouter;
