var React = require('react');
var queryString = require('query-string');
var Api = require("../Utils/Api");
var PlayerPreview = require('./PlayerPreview');
var Loading = require("./Loading");

function Profile(props){
    var info = props.info;

    return(
        <PlayerPreview avatar={info.avatar_url} username={info.login} >
   <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
      </PlayerPreview>
    )
}

function Player(props){
 return(
     <div className="header">
        <h2>{props.label}</h2>
        <h2>{props.score}</h2>
        <Profile info={props.profile}/>
    </div>
 )

}
class Result extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            winner:"",
            losser:"",
            loading:true,
            error:""
        }


    }




  componentDidMount(){
      var Player = queryString.parse(this.props.location.search);
      console.log(Player)
      Api.battle([
          Player.PlayerOneName,
          Player.PlayerTwoName
      ]).then(function(results){
          if(results === null){
           
           return this.setState(function(result){ 
                return{
                error: "there is an error please check the details entered",
                loading:false
            }
          })
        }

          this.setState(function(){
                    return {
                        winner:results[0],
                        losser:results[1],
                        error:"",
                        loading:false
                    }

          })
      }.bind(this))
      
  }
    render(){
      console.log(this.props)
      var winner = this.state.winner;
      var losser = this.state.losser;
      var error = this.state.error;
      var loading = this.state.loading;

      if(loading === true){
          return <Loading/>
      }
    return(
       <div className="row">
            <Player label="Winner"
                    score={winner.score}
                    profile={winner.profile}/>

                     <Player label="Losser"
                    score={losser.score}
                    profile={losser.profile}/>
         </div>   
    )
}

}

module.exports = Result;