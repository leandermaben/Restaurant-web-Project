import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './components/MenuComponent.js'
import Main from './components/MainComponent.js'
import './App.css';
import {DISHES} from './shared/dishes';
class App extends Component{
  render(){
      return (
        <div>
        <Main />
        </div>
      );
  }
}


export default App;
