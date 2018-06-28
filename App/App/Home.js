import React from "react";
import {Link} from "react-router-dom";

function Home(){
    return(
        <div className="header-container">
            Github Battle
            <Link className="button" to="/battle">Battle</Link>
        </div>
    )
}

export default Home;