const hex_random = require('./hex_random')
const shuffle = require('./helpers/shuffle')

/**
 * @returns {Map<String,Role>}
 */
function emptyRoleMap()
{
  return new Map()
}

class Werewolf 
{
  /**
   * 
   * @param  {Player[]} players 
   */
  constructor(players) 
  {
    this.players=players;
    this.playersRoles = emptyRoleMap()
    this.deadPlayers = Player.empty()
    this.addPlayers(players);
  }
  /**
   * @param {Player[]} players 
   */
  addPlayers(players)
  {
    let roles = this.getRoles(players)
    for (let i = 0; i < players.length; i++)
    {
      this.addPlayer(players[i], roles[i])
    }
  }
  /**
   * 
   * @param {Player} player 
   * @param {Role} role 
   */
  addPlayer(player, role)
  {
    this.playersRoles.set(player.id, role)
  }
  /**
   * 
   * @param {Player[]} players 
   */
  getRoles(players)
  {
    let roles = ['witch', 'hunter', 'villager', 'werewolf', 'oracle', 'werewolf', 'lone_wolf', 'werewolf', 'werewolf', 'spy', 'hunter', 'amor', 'villager', 'villager', 'werewolf', 'villager', 'villager', 'villager', 'villager', 'werewolf']
    return shuffle(roles.slice(0, players.length))
  }
  /**
   * @returns {Player[]}
   */
  getPlayers()
  {
    return this.players;
  }
  checkForDeadPlayer()
  {
    return this.players.find((player) => player.isDead())
  }
  setDead(id)
  {
    let player = this.players.find((player) => player.id == id)
    player.setDead()
    this.deadPlayers.push(player)
  }
  /**
   * @param {String} id
   * @returns {Player[]}
   */
  randomizePlayers(id)
  {
    let filter = this.playersRoles.filter(player => player.id !== id)
    let rand = hex_random.randomInt(0, filter.length)
    return filter[rand]
  }
}

class Player
{
  /**
   * Create a player from a player id
   * @param {String} id 
   */
  constructor(id) 
  {
    this.id=id
    this.dead=false
  }
  setDead()
  {
    this.dead=true
  }
  isDead()
  {
    return this.dead
  }
  /**
   * @returns {Player[]}
   */
  static empty()
  {
    return []
  }
}

class Role
{
  constructor(name)
  {
    this.name=name
    this.attribute = {}
  }
}

module.exports = Werewolf
