import React from "react";
import {Link} from "react-router-dom";
import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component{
constructor(props){
    super(props);
    this.state ={
        username:""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event){
  const value = event.target.value;
  this.setState(()=>({username:value}))
}

handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

render(){
const{ label}=this.props;
const {username} = this.state;
return(    
<form className="column" onSubmit={this.handleSubmit}>
<label className="header" htmlFor="username" >{label} </label>
<input id="username" type="text" value={username} onChange={this.handleChange} autoComplete="off"/>
<button className="button" type="submit" disabled={!username}>Submit</button>
</form>
)    
}

}

class Battle extends React.Component{
   constructor(props){
       super(props);
       this.state ={
            PlayerOneName:"",
            PlayerTwoName:"",
            PlayerOneImage:null,
            PlayerTwoImage:null
         }
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleReset = this.handleReset.bind(this);
   }
   
   handleSubmit(id,username){
     
    this.setState(()=>{
        return{
          [id + 'Name']:username,
          [id + 'Image']:`https://github.com/${username}.png?size=200`
        }
        });
   }
   
   handleReset(id) {
    this.setState(()=>{
      return{
        [id + 'Name']:"",
        [id + 'Image']:""
      }
    })
  }
    render(){
        const {match} = this.props;
        const{ PlayerOneName,PlayerTwoName,PlayerOneImage,PlayerTwoImage} = this.state;
    
       return(
        <div>
        <div className='row'>
          {!PlayerOneName &&
            <PlayerInput
              id='PlayerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}

          {PlayerOneImage !== null &&
            <PlayerPreview
              avatar={PlayerOneImage}
              username={PlayerOneName}>
            <button
            className='reset'
            onClick={()=>this.handleReset('PlayerOne')}>
              Reset
          </button>
          </PlayerPreview>}

          {!PlayerTwoName &&
            <PlayerInput
              id='PlayerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}

            
          {PlayerTwoImage !== null &&
            <PlayerPreview
              avatar={PlayerTwoImage}
              username={PlayerTwoName}>
             <button
            className='reset'
            onClick={()=>this.this.handleReset('PlayerTwo')}>
              Reset
          </button>
          </PlayerPreview>}
        </div>
            {PlayerOneName && PlayerTwoName &&
             <Link 
             className="button"
             to={{
                pathname:match.url + '/result',
                search:`?PlayerOneName=${PlayerOneName}&PlayerTwoName=${PlayerTwoName}` 
             }}>
             Battle
             </Link>  
             }
     
      </div>
       )
   }
}

export default Battle;