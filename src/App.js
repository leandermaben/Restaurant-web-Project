import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './components/MenuComponent.js'
import Main from './components/MainComponent.js'
import './App.css';
import {DISHES} from './shared/dishes';
import {BrowserRouter} from 'react-router-dom';
class App extends Component{
  render(){
      return (
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
        
      );
  }
}


export default App;
