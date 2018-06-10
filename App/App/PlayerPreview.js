var React = require("react");

function PlayerPreview(props){
    return(
      <div className="column">
        <img  className="avatar" src={props.avatar} alt={props.username}/>
        <h2 className="username">@{props.username}</h2>
       {props.children}
        </div>
   
    )
  }


  module.exports = PlayerPreview;