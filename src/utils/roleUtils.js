const shuffle = require("./shuffle")

module.exports = {
    getRoles
}

/**
 * get the roles list then shuffle it.
 * @param {number} players 
 */
function getRoles(players) {
    let roleArr = [
        'witch', 
        'hunter', 
        'villager', 
        'werewolf', 
        'oracle', 
        'werewolf',
        'lonewolf',
        'werewolf',
        'werewolf',
        'spy',
        'hunter',
        'amor',
        'healer',
        'villager',
        'villager',
        'werewolf',
        'villager',
        'villager',
        'villager',
        'villager',
        'werewolf'
    ]

    if(players > roleArr.length || players< roleArr.length || players == 0 || players < 6) {
        return "Error, a game need at least 6 players" 
    }

    return shuffle(roleArr.slice(0, players+1))
}