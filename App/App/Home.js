var React = require("react");
var Link = require("react-router-dom").Link;

function Home(){
    return(
        <div className="header-container">
            Github Battle
            <Link className="button" to="/battle">Battle</Link>
        </div>
    )
}

module.exports = Home;