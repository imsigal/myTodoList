// import React from 'react';
import React, { Component } from 'react';
// import { Switch, Route,HashRouter  } from 'react-router-dom'
import './App.css';

import MyTodoListComponents from './components/MyTodoListComponents';



  class App extends Component
  {
      constructor(props) {
        super(props);      
    
      this.state = {
      selectedActor:""
      }

    }
    selectActor=(actorName)=>
    {
      this.setState({
        selectedActor:actorName
      })
    }

    render()
    {
      return (
        <div>
          <MyTodoListComponents></MyTodoListComponents>
          {/* <NavBarComponent></NavBarComponent>
          <HashRouter>
            <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route exact path="/actors">
                  <ActorGalleryPage onSelectActor={this.selectActor}></ActorGalleryPage>
                </Route>
                <Route exact path="/movies">
                  <MovieGalleryPage selectedActor={this.state.selectedActor}></MovieGalleryPage>
                </Route>
            </Switch>
          </HashRouter> */}
        </div>
      
      );
    }
  }

export default App;
