const Discord = require('discord.io');
const fs = require('fs');

const auth = require('./auth.json');
const server = require('./server.json');
const help = require('./help.json');
const roles = require('./role.json');
let usersID = [];
let role = [];
let emotes = {
	error:'<:error:444107855822454786>',
	success: '<:success:emoteID>'
}

// on the werewolf server
const role_channels = {
	werewolves: '333348272846536705',
	witch: '333348364991201281',
	oracle: '333348394074374145',
	amor: '333378742049046531',
	love: '333379278538539009',
	dead: '334786229742731265',
}

// on the test server
// const test_role_channels = {
// 	werewolves: '469223747606282241',
// 	witch: '469223813498798090',
// 	oracle: '469223859829211147',
// 	amor: '333378742049046531',
// 	love: '469223884772605952',
// 	dead: '334786229742731265',
// }

const prefix = 'w:';

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a An array containing items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

//const helper = new discordHelper(bot);

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
    bot.setPresence({
      game: {
        name: 'gamemaster | w:help',
        type: '2',
        url: null
      }
		});
});

bot.on('message', function (user, userID, channelID, message, event) {
if (message.startsWith(prefix)) {
	var args = message.slice(prefix.length).split(' ');
	var cmd = args[0];
	if(cmd == 'rules') {
		bot.sendMessage({
			to:channelID,
			message:'Assemble a group of players. \nFor the first day, go around and have everyone introduce themselves \nDaytime is very simple; all the living players gather in the village and decide who to kill. As soon as a majority of players vote for a particular player to kill, the gamemaster(grabi) says \'Ok, you\'re dead.\'\nAt night the gamemaster tell you to sleep, then he ask oracle, then he ask werewolves who to kill'
		});
	}
	else if(cmd == 'vote') {
		if(args.length > 0) {
			let username = args[1];
			for(const member of Object.values(bot.servers[server.serverID].members)) {
				if(member.name = username) {
					dead_user.push(member.id);
				}
			}
		}
	}
	else if(cmd == 'perm') {
		
		bot.editChannelPermissions({
			channelID:channelID,
			userID:'408569903000453120',
			deny:[Discord.Permissions.TEXT_SEND_MESSAGES, Discord.Permissions.TEXT_READ_MESSAGES, Discord.Permissions.TEXT_READ_MESSAGE_HISTORY, Discord.Permissions.TEXT_ADD_REACTIONS]
		}, (err) => {
			if(err) throw err;
		});
	}
	else if(cmd == 'dead') {
		if (event.d.mentions.length == 1)  {
		bot.addToRole({
			serverID: server.serverID,
			userID: event.d.mentions[0].id,
			roleID: '335458298369146891'
		}),
		bot.sendMessage({
				to: channelID,
				message: event.d.mentions[0].username + ' was killed'
			});
		}
	}
	else if(cmd == 'reset') {
		let role = '333353928643313664';
		if (bot.servers[bot.channels[channelID].guild_id].members[userID].roles.includes(role)){
			if(event.d.mentions.length == 0) return;
			else if(event.d.mentions.length == 1) {
				bot.removeFromRole({
					serverID: server.serverID,
					userID: event.d.mentions[i].id,
					roleID: '333352501258485760'
				});
			}
			else {
				for (var i = 0; i<event.d.mentions.length; i++) {
					bot.removeFromRole({
						serverID: server.serverID,
						userID: event.d.mentions[i].id,
						roleID: '333352501258485760'
					});
				}
			}
		}
		else {
			bot.sendMessage({
				to:channelID,
				message:`${emotes.error} you don\'t have permission to use this command`
			}, (err, res) => {
				if(err) {
					throw err;
				}
				setTimeout(() => {
					bot.deleteMessage({
						channelID:channelID,
						messageID:res.id
					});
				}, 10000);
			});
		}
	}
	else if(cmd == 'help') {
		bot.sendMessage({
			to: channelID,
			embed: {
				title: 'Help',
				color: 0x00b4fa,
				fields: [
					{
						name : 'w:rules',
						value : 'show you the rules',
						inline : true
					},
					{
						name : 'w:start',
						value : 'start the game with all players from the current lobby.',
						inline : true
					},
					{
						name : 'w:add',
						value : 'add players to lobby. use w:start to start the game',
						inline : true
					}
				]
			}             
		});

	}
	else if(cmd == 'role') {
		if(args.length == 1){
			bot.sendMessage({
				to: channelID,
				embed: {
					title: 'Roles',
					description : '',
					color: 0x00b4fa,
					fields: [
						{
							name : 'Werewolf',
							value : roles.werewolf.desc,
							inline : true
						},
						{
							name : 'Hunter',
							value : roles.hunter.desc,
							inline : true
						},
						{
							name : 'Witch',
							value : roles.witch.desc,
							inline : true
						},
						{
							name : 'Healer',
							value : roles.healer.desc,
							inline : true
						},
						{
							name : 'Oracle',
							value : roles.oracle.desc,
							inline : true
						},
						{
							name : 'Amor',
							value : roles.amor.desc,
							inline : true
						},
						{
							name : 'Spy',
							value : roles.spy.desc,
							inline : true
						},
						{
							name : 'Lone wolf',
							value : roles.lonewolf.desc,
							inline : true
						},
						{
							name : 'Vilager',
							value : roles.villager.desc,
							inline : true
						},
					]
				}             
			});
		}
		else if(typeof roles[args[1]] !== 'undefined') {
			bot.sendMessage({
				to:channelID,
				message:`**${args[1].toUpperCase()} :** \n${roles[args[1]].desc}`
			});
		}
		else {
			bot.sendMessage({
				to:channelID,
				message:`<:error:444107855822454786> ${args[1]} is not a valid role. use w:role *without args* to see all roles`
			}, (err, res) => {
				if(err) throw err;
				setTimeout(() => {
					bot.deleteMessage({
						channelID:channelID,
						messageID:res.id
					});
				}, 10000);
			});
		}
	}
	else if(cmd == 'start') {
		for(var i = 0; i<event.d.mentions.length; i++) {
			usersID[i] = event.d.mentions[i].id;
		}
		role = ['witch', 'hunter', 'villager', 'werewolf', 'oracle', 'werewolf'];
		if(usersID.length == 0) return;
		else if(usersID.length == 21) {
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('hunter');
			role.push('amor');
			role.push('healer');
			role.push('villager');
			role.push('villager');
			role.push('werewolf');
			role.push('villager');
			role.push('villager');
			role.push('villager');
			role.push('villager');
			role.push('werewolf');
		}
		else if(usersID.length == 20) {
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
			role.push('amor');
			role.push('healer');
			role.push('villager');
			role.push('villager');
			role.push('werewolf');
			role.push('hunter');
			role.push('villager');
			role.push('villager');
			role.push('villager');
		}
		else if(usersID.length == 19) {
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
			role.push('amor');
			role.push('healer');
			role.push('villager');
			role.push('villager');
			role.push('werewolf');
			role.push('hunter');
			role.push('villager');
			role.push('werewolf');
		}
		else if(usersID.length == 18) {
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
			role.push('amor');
			role.push('healer');
			role.push('villager');
			role.push('villager');
			role.push('werewolf');
			role.push('villager');
		}
		else if(usersID.length == 17) {
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
			role.push('amor');
			role.push('healer');
			role.push('villager');
			role.push('villager');
			role.push('villager');
			role.push('hunter');
		}
		else if(usersID.length == 16) {
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
			role.push('amor');
			role.push('healer');
			role.push('villager');
			role.push('villager');
			role.push('hunter');
		}
		else if(usersID.length == 15) {
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
			role.push('amor');
			role.push('healer');
			role.push('villager');
			role.push('villager');
		}
		else if(usersID.length == 14) {
			role.push('villager');
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
			role.push('amor');
			role.push('healer');			
		}
		else if(usersID.length == 13) {
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
			role.push('amor');
			role.push('healer');			
		}
		else if(usersID.length == 12) {
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
			role.push('amor');
		}
		else if(usersID.length == 11) {
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
		}
		else if(usersID.length == 10) {
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
		}
		else if(usersID.length == 9) {
			role.push('lone wolf');
			role.push('werewolf');
			role.push('spy');
		}
		else if(usersID.length == 8) {
			role.push('lone wolf');
			role.push('werewolf');
		}
		else if(usersID.length == 7) {
			role.push('lone wolf');
		}
		else if(usersID.length == 6) {
			role = ['witch', 'hunter', 'villager', 'werewolf', 'oracle', 'werewolf'];
		}
		// console.log(shuffle(role));
		let r = shuffle(role);
		
		let val = '';
		let grabiID = '198780988959096832';
		let obj = [];
		for(let i = 0; i<r.length; i++) {
			bot.sendMessage({
				to: usersID[i],
				message: `Your (new)role is : ${r[i]}\nthis is your role. \ndon't tell anyone what your role is.`
			});

			obj.push({
				user: usersID[i],
				role: r[i]
			});

			fs.writeFileSync('./werewolf_data.json', JSON.stringify(obj));

			switch(r[i]) {
				case 'werewolf':
				case 'spy':
				case 'lone wolf':
				bot.editChannelPermissions({
					channelID:role_channels.werewolves,
					userID: usersID[i],
					allow:[Discord.Permissions.TEXT_SEND_MESSAGES, Discord.Permissions.TEXT_READ_MESSAGES, Discord.Permissions.TEXT_READ_MESSAGE_HISTORY, Discord.Permissions.TEXT_ADD_REACTIONS]
				}, (err) => {
					if(err) throw err;
				});
				break;
				case 'witch':
				bot.editChannelPermissions({
					channelID:role_channels.witch,
					userID: usersID[i],
					allow:[Discord.Permissions.TEXT_SEND_MESSAGES, Discord.Permissions.TEXT_READ_MESSAGES, Discord.Permissions.TEXT_READ_MESSAGE_HISTORY, Discord.Permissions.TEXT_ADD_REACTIONS]
				}, (err) => {
					if(err) throw err;
				});
				break;
				case 'oracle':
				bot.editChannelPermissions({
					channelID:role_channels.oracle,
					userID: usersID[i],
					allow:[Discord.Permissions.TEXT_SEND_MESSAGES, Discord.Permissions.TEXT_READ_MESSAGES, Discord.Permissions.TEXT_READ_MESSAGE_HISTORY, Discord.Permissions.TEXT_ADD_REACTIONS]
				}, (err) => {
					if(err) throw err;
				});
				break;
				case 'hunter':

				break;
				case 'amor':
				bot.editChannelPermissions({
					channelID:role_channels.amor,
					userID: usersID[i],
					allow:[Discord.Permissions.TEXT_SEND_MESSAGES, Discord.Permissions.TEXT_READ_MESSAGES, Discord.Permissions.TEXT_READ_MESSAGE_HISTORY, Discord.Permissions.TEXT_ADD_REACTIONS]
				}, (err) => {
					if(err) throw err;
				});
				break;
				case 'healer':
				case 'villager':
				default:
				// it's a villager or healer
				break;
			}
			let u = usersID[i];
			val+=`${bot.users[u].username} : ${r[i]}\n`
		}
		bot.sendMessage({
			to:grabiID,
			message:val
		});
	}
}
	
});

bot.on('disconnect', function(errMsg, code) {
  bot.connect();
});