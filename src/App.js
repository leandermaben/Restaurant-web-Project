import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './components/MenuComponent.js'
import Main from './components/MainComponent.js'
import './App.css';
import {Provider} from 'react-redux';
import {configureStore} from './redux/configureStore';
import {BrowserRouter} from 'react-router-dom';

const store=configureStore();

class App extends Component{
  render(){
      return (
        <Provider store={store}>
          <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
        </Provider>
        
      );
  }
}


export default App;
