import React from "react";

export default function PlayerPreview({avatar,username,children}){
    return(
      <div className="column">
        <img  className="avatar" src={avatar} alt={username}/>
        <h2 className="username">@{username}</h2>
       {children}
        </div>
   
    )
  }



