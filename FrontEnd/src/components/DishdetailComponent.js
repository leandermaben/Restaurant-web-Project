import React, { Component } from 'react';
import { Card, CardTitle, CardText,CardImg,CardBody,Row,Col, Modal, ModalHeader, ModalBody, Label, Button} from 'reactstrap';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components'


const minLength=(len)=>(val)=>val&&val.length>=len;

const maxLength=(len)=>(val)=>!val||val.length<=len;

class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen});
    }
    handleSubmit(value){
        alert("Rating: "+value.rating+" Name: "+value.name+" Comments: "+value.comment);
        this.props.postComment(this.props.dishId,value.rating,value.name,value.comment);
    }
    render(){
        return(
            <>
            <Button outline color="primary" onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg">  </span>{' '}
                Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={this.handleSubmit}>
                        <Row className="form-group">
                            <Col md={3}>
                                <Label htmlFor="rating">Rating</Label>
                            </Col>
                            <Col md={12}>
                                <Control.select model=".rating" id="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>  
                        <Row className="form-group">
                            <Col md={3}>
                                <Label htmlFor="name">Your Name</Label>
                            </Col>
                            <Col md={12}>
                                <Control.text model=".name" id="name" className="form-control" validators={{minLength:minLength(3),maxLength:maxLength(15)}}/>
                                <Errors show="touched" model=".name" messages={{minLength:"Name must be atleat 3 characters long",maxLength:"Name must be atleast 15 characters long"}} className="text-danger"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={3}>
                                <Label htmlFor="comment">Comment</Label>
                            </Col>
                            <Col md={12}>
                                <Control.textarea model=".comment" rows="6" id="comment" className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={3}>
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>               
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
        );
    }

    


}


function  RenderDish({dish}){
        if(dish!= null){
            return(
            <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%'}}>
                <Card>
                    <CardImg src={baseUrl+dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
            );
        }else{
            return(<div></div>);
        }
    }
 function RenderComments({comments ,postComment, dishId}){
        if(comments!=null){
            const com=comments.map((comment)=>{
                return(
                    <Fade in>
                        <li key={comment.id}>
                        <p><b>{comment.text}</b></p>
                        <p><b>-- {comment.author},{new Intl.DateTimeFormat('en-US',{ year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</b></p>
                        </li>
                    </Fade>
                );
            });
            return(
                <>
                <h4>Comments</h4>
                    <br></br>
                <div className="list-unstyled text-left">
                    <Stagger in>
                    {com}
                    </Stagger>
                </div>
                <CommentForm dishId={dishId} postComment={postComment}/>
                </>
            );
        }else{
            return(<div></div>);
        }
        
    }
    const DishDetail=(props)=>{
            if(props.isLoading){
                return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div> 
            );      
               }else if(props.errMsg){
                return(
                    <div className="container">
                        <div className="row">
                            <h4>{props.errMsg}</h4>
                        </div>
                    </div>     
                );
        
        }else{
            return(
                <div className="container">
                     <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/menu'>Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem activate> 
                                {props.dish.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments}
                            postComment={props.postComment} dishId={props.dish.id}/> 
                        </div>    
                    </div>
                </div>
            );
        }       
    }

export default DishDetail;