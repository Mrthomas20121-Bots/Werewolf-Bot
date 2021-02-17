const Eris = require('eris')

// config
const config = require('./config/config')

// utils
const shuffle = require('./utils/shuffle')
const permUtils = require('./utils/permUtils')
const translate = require('./utils/translate')
const hex = require('./utils/hex_random')
const LobbyCreator = require('./lobby')

// auth.token to get the token
const auth = require('./auth.json')

// day time
let day = true
// check if a game is running
let play = false

// users
let users = []

// lobbies
let lobbies = new LobbyCreator()

// discord bot instance
const bot = new Eris.CommandClient(auth.token, {}, {
    description:'a Werewolf bot',
    owner:'Mrthomas20121',
    prefix:config.prefix
})

// when the bot is ready
bot.on('ready', function() {
	// send a message in the chat when the bot is ready
	console.log('Ready!\n')
    bot.editStatus('online', {
        name: `the sound of silence || ${config.prefix}help`,
        type: 2 // type '2' is listenning to
    })
    
    // check every 5s if there anyone dead.
    // setInterval(() => {
    //     if(!play) return;
    //     else if(users.length > 0) {
    //         let filtered_users = users.filter((value) => value.dead)
    //         if(day) {
    //             for(const user of filtered_users) {
    //                 // add dead role to user
    //                 bot.addGuildMemberRole(config.serverID, user.id, '335458298369146891', 'User is dead');
    //                 bot.createMessage(config.role_channels.daytime, translate.convert('message.player.dead_at_night'))
    //             }
    //         }
    //     }
    // }, 5000)
})
const lobbyCommand = bot.registerCommand('lobby', (message, args) => {}, {
    description:translate.convert('command.lobby.description'),
    fullDescription:translate.convert('command.lobby.description')
})

lobbyCommand.registerSubcommand('create', (message, args) => {
    if(args.length != 0) {
        lobbies.addLobby(args[0])
        // message with the reaction
        return translate.convert_string('message.lobby.join', args[0])
    }
}, {
    description: translate.convert('command.create_lobby.description'),
    fullDescription: translate.convert('command.create_lobby.full_description'),
    argsRequired:true,
    invalidUsageMessage:  translate.convert('error.command.invalid'),
    usage:'<lobby>',
    reactionButtonTimeout:50000,
    reactionButtons: [
        {
            emoji: '⬆️',
            type: 'edit',
            response: (msg) => {
                msg.getReaction('⬆️', 1).then((user) => { 
                    let u = user[0]
                    let exist = users.find((member) => member.id === u.id)
                    let index = users.findIndex((member) => member.id === u.id)
                    if(u.id != '335413516095979520') {
                        if(typeof exist !== 'object') {
                            users.push({
                                id:u.id,
                                dead:false
                            })
                            bot.createMessage(msg.channel.id, translate.convert_string('message.player.join_lobby', u.username))
                        }
                        else {
                            users.splice(index, 1)
                            bot.createMessage(msg.channel.id, translate.convert_string('message.player.left_lobby', u.username))
                        }
                    }
                })
            }
        }
    ]
})

lobbyCommand.registerSubcommand('join', (message, args) => {
    users.push({
        id:message.author.id,
        dead:false
    })
    bot.createMessage(message.channel.id, translate.convert_string('message.player.join_lobby', message.author.username))
}, {
   description: translate.convert('command.join_lobby.description'),
   fullDescription: translate.convert('command.join_lobby.full_description')
})

let role = bot.registerCommand('role', (message, args) => {}, {
    description: translate.convert('command.role.description'),
    fullDescription: translate.convert('command.role.description'),
    usage: '<list> || <view> <role name>'
})

role.registerSubcommand('list', (message, args) => {

    let arr = []
    let roles = [
        'werewolf', 
        'hunter',
        'witch',
        'healer',
        'oracle',
        'amor',
        'spy',
        'lonewolf',
        'villager',
    ]

    roles.forEach((value) => {
        arr.push({
            name:translate.convert(`role.${value}.name`),
            value:translate.convert(`role.${value}.desc`)
        })
    })

    bot.createMessage(message.channel.id, {
        embed:{
            color:parseInt(hex.hex_random(5), 16),
            description:translate.convert('command.role.list.description'),
            fields:arr,
            timestamp:new Date(),
            footer:{
                icon_url:'',
                text:'Werewolf Bot'
            }
        }
    })
}, {
    description: translate.convert('command.role.list.description'),
    fullDescription: translate.convert('command.role.list.description'),
    aliases:['l']
})

role.registerSubcommand('view', (message, args) => {

    let roles = [
        'werewolf', 
        'hunter',
        'witch',
        'healer',
        'oracle',
        'amor',
        'spy',
        'lonewolf',
        'villager',
    ]

    if(!roles.includes(args[0])) {
        bot.createMessage(message.channel.id, translate.convert_string('error.not_found', 'Role', args[0])).then(
            (value) => {
                setTimeout(() => {
                    value.delete()
                }, 5000)
            }
        ).catch((reason) => { console.log(reason)})
    }
    else {
        bot.createMessage(message.channel.id, {
            embed:{
                color:parseInt(hex.hex_random(5), 16),
                description:translate.convert('command.role.view.description'),
                fields:[
                    {
                        name:translate.convert(`role.${args[0]}.name`),
                        value:translate.convert(`role.${args[0]}.desc`)
                    }
                ],
                timestamp:new Date(),
                footer:{
                    icon_url:'',
                    text:'Werewolf Bot'
                }
            }
        })
    }
}, {
    description: translate.convert('command.role.view.description'),
    fullDescription: translate.convert('command.role.view.description'),
    argsRequired:true,
    aliases:['see', 'v', 's'],
    usage:'<role name>'
})

bot.registerCommand('checkForDead', (message, args) => {
    if(!play) return;
    else if(users.length > 0) {
        let filtered_users = users.filter((value) => value.dead)
        if(day && filtered_users.length > 0) {
            for(const user of filtered_users) {
                // add dead role to user
                bot.addGuildMemberRole(config.serverID, user.id, '335458298369146891', 'User is dead').then(() => {
                    bot.editChannelPermission(config.channels.last_will, user.id, permUtils.readAndWrite(), 0, 'member')
                })
                bot.createMessage(config.role_channels.daytime, translate.convert('message.player.dead_at_night'))
            }
        }
    }
}, {
    description:translate.convert('command.check_for_dead.description'),
    fullDescription:translate.convert('command.check_for_dead.description')
})

bot.connect()