import React, { Component } from 'react';  
import TodosViewContainer from '../containers/TodosViewContainer'

class App extends Component { 
  render() { 
    return (
      <div className="App"> 
        <TodosViewContainer />
      </div>
    );
  }
} 

export default App