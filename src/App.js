import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';
import './App.css';
import Home from "./components/Home";
import Navbar1 from "./components/Navbar";
import  PC  from "./components/pc";



class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Fragment>
             <Navbar1/>
            <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path='/navbar' component={Navbar1} />
              <Route exact path='/pc' component={PC} />
              <Route exact path='/**' render={()=><Redirect to="/home"/>} />
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App