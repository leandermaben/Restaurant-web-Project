import React from 'react';
import { Card, CardTitle, CardText,CardImg,CardBody } from 'reactstrap';


function  RenderDish({dish}){
        if(dish!= null){
            return(
            <Card>
                <CardImg src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>
                        {dish.name}
                    </CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            );
        }else{
            return(<div></div>);
        }
    }
 function RenderComments({comments}){
        if(comments!=null){
            const com=comments.map((comment)=>{
                return(
                    <li key={comment.num}>
                        <p><b>{comment.text}</b></p>
                        <p><b>-- {comment.author},{new Intl.DateTimeFormat('en-US',{ year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</b></p>
                    </li>
                );
            });
            return(
                <div className="list-unstyled text-left">
                    <h4>Comments</h4>
                    <br></br>
                    {com}
                </div>
            );
        }else{
            return(<div></div>);
        }
        
    }
    const DishDetail=(props)=>{
        var c;
        if(props.selectedDish!=null){
            c=<RenderComments comments={props.selectedDish.comments}/>;
        }else{
            c=(<div></div>);
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.selectedDish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {c}  
                    </div>    
                </div>
            </div>
        );
    }

export default DishDetail;