//This is where I will interact with the highscores json file,
//as well as where I will interact with data surrounding players



/*
//player stuff that i will flesh out when I create multiplayer, the functions
//under this section surrounding players are temporary

const playerList = [
    player objects
]


export function createPlayer(name) {
    //handle case of playerName already exists
    //playerList.add("name", 0 (score))
}

export function getPlayer(name) {
    returns the playerList index of that name

}
*/

const player = {
    name: "Player 1",
    score: 0 
}

export function getPlayerScore() {
    return player.score;
}

export function getHighScore(roundVal) {
    //retrieves data from the json file with current numRounds
    //for now just returns whatever current score is
    if (localStorage.getItem)


    return getPlayerScore();
}