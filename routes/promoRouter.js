const express=require('express');
const bodyParser=require('body-parser');

const promoRouter=express.Router();
const Promotions=require('../models/promotions');
const authenticate=require('../authenticate');
const cors=require('./cors');

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.options(cors.corsWithOptions,(req,res,next)=>{
    res.sendStatus(200);
})
.get(cors.cors,(req,res,next)=>{
    Promotions.find({}).then((promotions)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    },err=>next(err)
    ).catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Promotions.create(req.body).then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },err=>next(err)
    ).catch((err)=>next(err));
}).put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT opreation not supported on /promos.');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Promotions.remove({}).then((promotions)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    },err=>next(err)
    ).catch((err)=>next(err));
});

promoRouter.route('/:promoId')
.options(cors.corsWithOptions,(req,res,next)=>{
    res.sendStatus(200);
})
.get(cors.cors,(req,res,next)=>{
    Promotions.findById(req.params.promoId).then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },err=>next(err)
    ).catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('POST opreation not supported on /promos.');
}).put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId,{$set:req.body},{new:true}).then((promotion)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(promotion);
    },err=>next(err)
    ).catch((err)=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId).then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },err=>next(err)
    ).catch((err)=>next(err));
});
module.exports=promoRouter;