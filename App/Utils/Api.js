import axios from "axios";

const id = `7140e272f40377e6efbdc21220830a62eaf7dd5d`;
const sec = `d2ca61f829bc5911c3b985d95ae37c243cc2bd70`;
const params = `?client_id=${id}&client_secret=${sec}`;

function getProfile (username) {
  return axios.get(`https://api.github.com/users/${username}${params}`)
    .then((user)=>( 
         user.data
    ));
}

function getRepos (username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}




function getStarCount(repos){
    return repos.data.reduce((count,repo)=>{
            return count + repo.stargazers_count;
    },0);

}

function handleError(error){
    console.log(error)
    return null
}

function calculateScore({followers},repos){
    return (followers * 3) + getStarCount(repos);
}


function getUserData(player){
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(([profile,repos])=>({
            profile,
            score:calculateScore(profile,repos)
    }))
}


function sortPlayers (players) {
    return players.sort((a,b) => b.score - a.score);
  }

module.exports ={
    battle:(players)=> {
        return axios.all(players.map(getUserData))
          .then(sortPlayers)
          .catch(handleError);
      },
    fetchgithub:(language)=>{
        var encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc`);
        
       return axios.get(encodedURI)
                .then(({data})=>data.items)
    }
}