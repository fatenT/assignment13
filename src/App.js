import React, { Component } from 'react';
import Products from './Products'

class App extends Component {
   
    render() {  //console.log("App p list= " + this.state.data)
      return ( 
        <div>
          <Products ></Products>
        </div>
      );
    }
}
  

export default App;