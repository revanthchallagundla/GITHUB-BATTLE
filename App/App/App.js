import React from "react";
import ReactDom from "react-dom"
import Popular from "./Popular";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Battle from "./Battle";
import Result from "./Result";

class App extends React.Component{
    render(){
        return(
          
            <Router>
            <div className="container">
                <Nav />
                <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/popular" component={Popular} />
                <Route exact path="/battle" component={Battle} />
                <Route path="/battle/result" component={Result} />
                <Route render={()=><p>Not Found</p>} />
                </Switch>
                
                </div>
                </Router>
                
        )
    }

}

export default  App;