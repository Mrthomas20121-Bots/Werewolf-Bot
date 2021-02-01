/**
 * Class used to create Lobbies
 * @class LobbyCreator
 * @version 1.0.0 
 * @copyright 2021 Mrthomas20121
 */
module.exports = class LobbyCreator {

    /**
     * @type {{name:string}[]} list
     */
    list = []

    /**
     * @constructor
     */
    constructor() {
    
    }
    /**
     * add a lobby
     * @param {String} name 
     */
    addLobby(name) {
        this.list.push({
            name:name
        })
    }

    exports() {
        const fs = require('fs')
        
    }
}