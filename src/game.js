const Hashids = require("hashids");
const { List, ImmutableList } = require("void-list");
const { VoidMap } = require('void-map');

class Hash {
    static DEFAULT = new Hashids();
    static create(salt) {
        return new Hashids(salt);
    }
}

class Game {
    /**
     * @type VoidMap<string, string>
     */
    playerMap;

    /**
     * 
     * @param {string[]} players 
     */
    constructor(players) {
        this.playerMap = new VoidMap().from<String, string>(List.fromArray(players), List.fromArray(players).map((value, i) => Hash.DEFAULT.encode(value.charCodeAt(0), i)));
    }
}