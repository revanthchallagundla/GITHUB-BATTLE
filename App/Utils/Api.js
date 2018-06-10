var axios = require("axios");

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile (username) {
  return axios.get('https://api.github.com/users/' + username + params)
    .then(function (user) {
      return user.data;
    });
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}




function getStarCount(repos){
    return repos.data.reduce(function(count,repo){
            return count + repo.stargazers_count;
    },0);

}

function handleError(error){
    console.log(error)
    return null
}

function calculateScore(username,repos){
    var followers = username.followers;
    var totalstars = getStarCount(repos);
    return (followers * 3) + totalstars;
}


function getUserData(player){
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(function(data){
        var profile = data[0];
        var repos = data[1];

        return{
            profile:profile,
            score:calculateScore(profile,repos)
        }
    })
}


function sortPlayers (players) {
    return players.sort(function (a,b) {
      return b.score - a.score;
    });
  }

module.exports ={
    battle: function (players) {
        return axios.all(players.map(getUserData))
          .then(sortPlayers)
          .catch(handleError);
      },
    fetchgithub: function(language){
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc');
        
       return axios.get(encodedURI)
                .then(function(resp){
                    return resp.data.items;
                })
    }
}