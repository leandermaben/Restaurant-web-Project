import * as ActionTypes from './ActionTypes';
import {DISHES} from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment)=>({
    type:ActionTypes.ADD_COMMENT,
    payload:comment
});

export const postComment= (dishId,rating, author,comment)=>(dispatch)=>{
    const newComment = {
        dishId: dishId,
        rating: rating,
        author:author,
        comment:comment
    };
    newComment.date = new Date().toISOString();
    alert("Before Posting \n "+JSON.stringify(newComment));
    return fetch(baseUrl + 'comments', {
        method:'POST',
        body:JSON.stringify(newComment),
        headers:{'Content-Type':'application/json'},
        credentials:'same-origin'
    })
    .then(response=>{
        if(response.ok){
         return response;
        }else{
            var err=new Error("Error "+response.status+": "+response.statusText);
             err.response=response;
             throw err;
         }
     },error => {
         var errmess=new Error(error.message);
         throw errmess;
     })
    .then(response => response.json(),error => {
        var errmess=new Error(error.message);
        throw errmess;
    })
    .then(comment => {
        alert(JSON.stringify(comment));
        dispatch(addComment(comment));},
        error => {
            var errmess=new Error(error.message);
            throw errmess;
        })
    .catch(error=>{console.log('Post comments ',error.message);
        alert("Your comment could not be posted\nError");
    });
};

export const fetchDishes=()=>(dispatch)=>{
    dispatch(dishesLoading(true));
   return fetch(baseUrl + 'dishes')
   .then(response=>{
    if(response.ok){
     return response;
    }else{
        var err=new Error("Error "+response.status+": "+response.statusText);
         err.response=response;
         throw err;
     }
 },error => {
     var errmess=new Error(error.message);
     throw errmess;
 })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = ()=>({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) =>({
    type:ActionTypes.DISHES_FAILED,
    payload:errmess
});

export const addDishes=(dishes) =>({
    type: ActionTypes.ADD_DISHES,
    payload:dishes
});

export const fetchComments=()=>(dispatch)=>{
   return fetch(baseUrl + 'comments')
   .then(response=>{
       if(response.ok){
        return response;
       }else{
           var err=new Error("Error "+response.status+": "+response.statusText);
            err.response=response;
            throw err;
        }
    },error => {
        var errmess=new Error(error.message);
        throw error;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addComments(dishes)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) =>({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errmess
});

export const addComments=(comments) =>({
    type: ActionTypes.ADD_COMMENTS,
    payload:comments
});

export const fetchPromos=()=>(dispatch)=>{
    dispatch(promosLoading(true));
   fetch(baseUrl + 'promotions')
   .then(response=>{
    if(response.ok){
     return response;
    }else{
        var err=new Error("Error "+response.status+": "+response.statusText);
         err.response=response;
         throw err;
     }
 },error => {
     var errmess=new Error(error.message);
     throw errmess;
 })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = ()=>({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) =>({
    type:ActionTypes.PROMOS_FAILED,
    payload:errmess
});

export const addPromos=(promos) =>({
    type: ActionTypes.ADD_PROMOS,
    payload:promos
});

export const leadersLoading=()=>{
    return {
        type:ActionTypes.LEADERS_LOADING
    }
};

export const addLeaders =(leaders)=>({
    type:ActionTypes.ADD_LEADERS,
    payload:leaders
});

export const leadersFailed =(error)=>({
    type:ActionTypes.LEADERS_FAILED,
    payload:error
});

export const fetchLeaders = ()=>(dispatch)=>{
    dispatch(leadersLoading());
    fetch(baseUrl+'leaders')
    .then(response=>{
        if(response.ok){
            return response;
        }else{
            var err=new Error("Error "+response.status+": "+response.statusText);
         err.response=response;
         throw err;
        }
    },error=>{
        var errmess=new Error(error.message);
        throw errmess;
    })
    .then(response=>response.json())
    .then(response=>{
        dispatch(addLeaders(response));
    })
    .catch(error=>dispatch(leadersFailed(error.message)));
};
export const postFeedback=(values)=>(dispatch)=>{
    fetch(baseUrl+'feedback',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(values),
        credentials:'same-origin'
    })
    .then(response=>{
        if(response.ok)
            return response;
        else{
            var err=new Error("Error "+response.status+": "+response.statusText);
            err.response=response;
            throw err;
        }
    },error=>{
        var errmess=new Error(error.message);
        throw errmess;
    })
    .then(response=>response.json())
    .then(response=>alert(JSON.stringify(response)))
    .catch(err=>alert("FeedBack submission Failed "+err.message))
};