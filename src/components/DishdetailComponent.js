import React,{ Component } from 'react';
import { Card, CardTitle, CardText,CardImg,CardBody } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    renderDish(dish){
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
 renderComments(comments){
        if(comments!=null){
            const com=comments.map((comment)=>{
                return(
                    <div tag='li' key="comment.num">
                        <p><b>{comment.text}</b></p>
                        <p><b>-- {comment.author},{comment.date}</b></p>
                    </div>
                );
            });
            return(
                <div className="unstyled-list text-left">
                    <h4>Comments</h4>
                    <br></br>
                    {com}
                </div>
            );
        }else{
            return(<div></div>);
        }
        
    }
    render(){
        var c;
        if(this.props.selectedDish!=null){
            c=this.renderComments(this.props.selectedDish.comments);
        }else{
            c=(<div></div>);
        }
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {c}     
                </div>
                
            </div>
        );
    }
}
export default DishDetail;