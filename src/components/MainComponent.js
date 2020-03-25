import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent.js'
import '../App.css';
import {DISHES} from '../shared/dishes';
import DishDetail from './DishdetailComponent.js';
class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      selectedDish:null
    };
  }
  onDishSelect(dishId){
    this.setState({selectedDish:dishId});
    }
  render(){
      return (
        <div className="App">
          <Navbar dark color="primary">
            <div className="App">
            <NavbarBrand href="/">Restorante Con Fusion</NavbarBrand>
            </div>
          </Navbar>
          <Menu dishes={this.state.dishes} onClick={ (dishId)=> this.onDishSelect(dishId)}/>
          <DishDetail selectedDish={this.state.dishes.filter((dish)=> dish.id===this.state.selectedDish)[0]}/>
        </div>
      );
  }
}


export default Main;
