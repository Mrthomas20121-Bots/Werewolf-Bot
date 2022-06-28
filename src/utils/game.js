const List = require('void-list')
const roleUtils = require('./roleUtils')

module.exports = class Game {
    /**
     * @type {List<String>}
     */
    #players = new List()
    /**
     * @type {List<String>}
     */
    #roles = new List()

    /**
     * @type {Map<string,string>}
     */
    #playerData = new Map()

    constructor() {}

    addPlayer(player) {
        this.#players.add(player)
    }

    start() {
        this.#roles = List.fromArray(roleUtils.getRoles(this.#players.size()))

        // add data to the player data
        for(let i = 0; i<=this.#roles.size(); i++) {
            let player = this.#players.get(i)
            let role = this.#roles.get(i)
            this.#playerData.set(player, {
                role,
                dead:false
            })
        }
    }

    save() {

        let json = {
            players:[]
        }

        this.#playerData.forEach((player, role) => {

        })
    }
}