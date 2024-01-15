const Eris = require('eris');
const List = require('void-list');
const { Logger } = require('void-logger');

const Constants = Eris.Constants;

// utils
// const shuffle = require('./utils/shuffle');
// const permUtils = require('./utils/permUtils');
const { randomInt, randomHexColor } = require('./utils/randomUtil');
// const Game = require('./utils/game');

const logger = Logger.create('.', {
    logName: 'latest',
    logFormat: '[type] [date] [time] [text]',
    dateFormat: '[year]/[day]/[month]',
    timeFormat:'[hours]:[minutes]:[seconds]',
    logToConsole:false
});

// auth.token to get the token
const auth = require('./auth.json');

// discord bot instance
const bot = new Eris.Client(auth.token, {
    autoreconnect: true
});

bot.on('ready', async () => {
    // clear the log
    logger.clearLog();
    console.log('bot is online');
    logger.info('bot is online');

    bot.editStatus('online', {
        name: `with the villagers`,
        type: 1 // type '2' is listenning to
    });

    bot.createCommand({
        name: '8ball',
        description: 'Ask Questions and get anwser',
        options: [
            {
                name: 'question',
                description: 'A question',
                type: Constants.ApplicationCommandOptionTypes.STRING,
                required: true
            }
        ],
        type: Constants.ApplicationCommandTypes.CHAT_INPUT
    });

    bot.createCommand({
        name: 'role',
        description: 'Get a list of roles',
        options: [
            {
                name: 'name',
                description: 'a role name',
                type: Constants.ApplicationCommandOptionTypes.STRING,
                required: true,
                choices: [
                    {
                        name: 'werewolf',
                        value: 'werewolf'
                    },
                    {
                        name: 'hunter',
                        value: 'hunter'
                    },
                    {
                        name: 'witch',
                        value: 'witch'
                    },
                    {
                        name: 'healer',
                        value: 'healer'
                    },
                    {
                        name: 'oracle',
                        value: 'oracle'
                    },
                    {
                        name: 'amor',
                        value: 'amor'
                    },
                    {
                        name: 'spy',
                        value: 'spy'
                    },
                    {
                        name: 'lonewolf',
                        value: 'lonewolf'
                    },
                    {
                        name: 'villager',
                        value: 'villager'
                    },
                    {
                        name: 'list',
                        value: 'list'
                    }
                ]
            }
        ],
        type: Constants.ApplicationCommandTypes.CHAT_INPUT
    });
});

bot.on('disconnect', () => {
    logger.info('bot is disconnected!');
    logger.clearLog();
});

bot.on('error', (err, id) => {
    logger.error(err.message);
});

bot.on("interactionCreate", (interaction) => {
    if(interaction instanceof Eris.CommandInteraction) {
        if(interaction.data.name == '8ball') {
            let array = ['absolutely', 'yes', 'no', 'not in  a million year', 'maybe', 'bad idea', 'try again', "will not happens!", 'might happens in another timeline'];
            interaction.createMessage(array[randomInt(0, array.length)]);
        }
        else if(interaction.data.name == 'role') {
            if(typeof interaction.data.options !== 'undefined') {
                if(interaction.data.options.length > 0 ) {
                    if(interaction.data.options[0].value == 'list') {
                        interaction.createMessage({
                            embeds: [
                                {
                                    "title": "Role list",
                                    "description": "List all the roles available",
                                    "color": 0xFFFFFF,
                                    "fields": [
                                        {
                                            name: 'werewolf',
                                            value: 'Type /role werewolf for more info'
                                        },
                                        {
                                            name: 'hunter',
                                            value: 'Type /role hunter for more info'
                                        },
                                        {
                                            name: 'witch',
                                            value: 'Type /role witch for more info'
                                        },
                                        {
                                            name: 'healer',
                                            value: 'Type /role healer for more info'
                                        },
                                        {
                                            name: 'oracle',
                                            value: 'Type /role oracle for more info'
                                        },
                                        {
                                            name: 'amor',
                                            value: 'Type /role amor for more info'
                                        },
                                        {
                                            name: 'spy',
                                            value: 'Type /role spy for more info'
                                        },
                                        {
                                            name: 'lonewolf',
                                            value: 'Type /role lonewolf for more info'
                                        },
                                        {
                                            name: 'villager',
                                            value: 'Type /role villager for more info'
                                        }
                                    ],
                                    "footer": {
                                        "text": "Werewolf Bot"
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        
                    }
                }
            }
            
        }
    }
});

bot.connect();

// lobbyCommand.registerSubcommand('join', (message, args) => {
//     users.push({
//         id:message.author.id,
//         dead:false
//     })
//     bot.createMessage(message.channel.id, translate.convert_string('message.player.join_lobby', message.author.username))
// }, {
//    description: translate.convert('command.join_lobby.description'),
//    fullDescription: translate.convert('command.join_lobby.full_description')
// })

// let role = bot.registerCommand('role', (message, args) => {}, {
//     description: translate.convert('command.role.description'),
//     fullDescription: translate.convert('command.role.description'),
//     usage: '<list> || <view> <role name>'
// })

// role.registerSubcommand('list', (message, args) => {

//     let arr = []
//     let roles = [
//         'werewolf', 
//         'hunter',
//         'witch',
//         'healer',
//         'oracle',
//         'amor',
//         'spy',
//         'lonewolf',
//         'villager',
//     ]

//     roles.forEach((value) => {
//         arr.push({
//             name:translate.convert(`role.${value}.name`),
//             value:translate.convert(`role.${value}.desc`)
//         })
//     })

//     bot.createMessage(message.channel.id, {
//         embed:{
//             color:parseInt(hex.hex_random(5), 16),
//             description:translate.convert('command.role.list.description'),
//             fields:arr,
//             timestamp:new Date(),
//             footer:{
//                 icon_url:'',
//                 text:'Werewolf Bot'
//             }
//         }
//     })
// }, {
//     description: translate.convert('command.role.list.description'),
//     fullDescription: translate.convert('command.role.list.description'),
//     aliases:['l']
// })

// role.registerSubcommand('view', (message, args) => {

//     let roles = [
//         'werewolf', 
//         'hunter',
//         'witch',
//         'healer',
//         'oracle',
//         'amor',
//         'spy',
//         'lonewolf',
//         'villager',
//     ]

//     if(!roles.includes(args[0])) {
//         bot.createMessage(message.channel.id, translate.convert_string('error.not_found', 'Role', args[0])).then(
//             (value) => {
//                 setTimeout(() => {
//                     value.delete()
//                 }, 5000)
//             }
//         ).catch((reason) => { console.log(reason)})
//     }
//     else {
//         bot.createMessage(message.channel.id, {
//             embed:{
//                 color:parseInt(hex.hex_random(5), 16),
//                 description:translate.convert('command.role.view.description'),
//                 fields:[
//                     {
//                         name:translate.convert(`role.${args[0]}.name`),
//                         value:translate.convert(`role.${args[0]}.desc`)
//                     }
//                 ],
//                 timestamp:new Date(),
//                 footer:{
//                     icon_url:'',
//                     text:'Werewolf Bot'
//                 }
//             }
//         })
//     }
// }, {
//     description: translate.convert('command.role.view.description'),
//     fullDescription: translate.convert('command.role.view.description'),
//     argsRequired:true,
//     aliases:['see', 'v', 's'],
//     usage:'<role name>'
// })

// bot.registerCommand('checkForDead', (message, args) => {
//     if(!play) return;
//     else if(users.length > 0) {
//         let filtered_users = users.filter((value) => value.dead)
//         if(day && filtered_users.length > 0) {
//             for(const user of filtered_users) {
//                 // add dead role to user
//                 bot.addGuildMemberRole(config.serverID, user.id, '335458298369146891', 'User is dead').then(() => {
//                     bot.editChannelPermission(config.channels.last_will, user.id, permUtils.readAndWrite(), 0, 'member')
//                 })
//                 bot.createMessage(config.role_channels.daytime, translate.convert('message.player.dead_at_night'))
//             }
//         }
//     }
// }, {
//     description:translate.convert('command.check_for_dead.description'),
//     fullDescription:translate.convert('command.check_for_dead.description')
// })