var React = require("react");
var ReactDom = require("react-dom");
var Popular = require("./Popular");
var ReactRouter = require("react-router-dom");
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require("./Nav");
var Home = require("./Home");
var Battle =require("./Battle");
var Switch = require("react-router-dom").Switch;
var Result = require("./Result");

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
                <Route render={function(){
                    return<p>Not Found</p>
                }} />
                </Switch>
                
                </div>
                </Router>
                
        )
    }

}

module.exports = App;