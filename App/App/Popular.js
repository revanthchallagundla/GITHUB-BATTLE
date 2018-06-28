import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import api from "../Utils/Api";
import Loading from "./Loading";

function RepoGrid(props){
 return( 
      <ul className="popular-list">
        {props.repos.map((repo,index)=>(

        <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        ))}

     </ul>
 )
}

RepoGrid.propTypes={
  repos: PropTypes.array.isRequired,

}

function SelectedLanguage({selectedLanguage,selected}){
    var languages = ["ALL","JAVA","PYTHON","PHP","JAVASCRIPT","C"];

    return(
        <ul className="languages">
        {languages.map((lang)=>(
                <li style={selectedLanguage == lang ?{color :"red"}:null}
                    onClick={()=>selected(lang)}
                    key={lang}>
                    {lang}
                    </li>
             ))}                
        </ul>
    )
}

SelectedLanguage.propTypes ={
selectedLanguage:PropTypes.string.isRequired,
selected:PropTypes.func.isRequired
}



class Popular extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedLanguage : "ALL",
            repos : null
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
    }


    updateLanguage(lang){
    this.setState(()=>({
        selectedLanguage : lang
        }))   
    


    api.fetchgithub(lang)
            .then((resp)=>{
            this.setState(()=>{
                console.log(resp)
                return {repos:resp}
            })
        })

}

render(){
   
    return(
        <div>
            <SelectedLanguage selectedLanguage={this.state.selectedLanguage}
                              selected={this.updateLanguage} />
             
             {!this.state.repos ?
             <Loading text="Loading"/>:
             <RepoGrid repos={this.state.repos}/>}
        </div>   
        )  
    }
}

export default Popular;