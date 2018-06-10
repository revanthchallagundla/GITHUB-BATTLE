var React = require("react");
var ReactDom = require("react-dom");
var PropTypes = require("prop-types");
var api = require("../Utils/Api");
var Loading = require("./Loading");

function RepoGrid(props){
 return( 
      <ul className="popular-list">
        {props.repos.map(function(repo,index){
         return (
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
           
         )

        })}

     </ul>
 )
}

RepoGrid.propTypes={
  repos: PropTypes.array.isRequired,

}

function SelectedLanguage(props){
    var languages = ["ALL","JAVA","PYTHON","PHP","JAVASCRIPT","C"];

    return(
        <ul className="languages">
        {languages.map(function(lang){
            return(
                <li style={props.selectedLanguage == lang ?{color :"red"}:null}
                    onClick={props.selected.bind(null,lang)}
                    key={lang}>
                    {lang}
                    </li>
            )
        })}
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
    this.setState(function(){
        return {
            selectedLanguage : lang
        }
    })


    api.fetchgithub(lang)
            .then(function(resp){
            this.setState(function(){
                console.log(resp)
                return {repos:resp}
            })
        }.bind(this))

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

module.exports = Popular;