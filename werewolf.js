var Discord = require('discord.io');
var auth = require('./auth.json');
var server = require('./server.json');
const help = require('./help.json');
const roles = require('./role.json');
var player = [];
var nbPlayer = 0;
var serverID = '333341155737731072';
var usersID = [];
var role = [];
let game = {};
const discordHelper = require('../helper/helper');

const prefix = "w:";

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

const helper = new discordHelper(bot);

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
    bot.setPresence({
      game: {
        name: "w:help",
        type: "1",
        url: null
      }
    });
});

bot.on('message', function (user, userID, channelID, message, event) {
  
if (message.startsWith(prefix)) {
	var args = message.slice(prefix.length).split(" ");
	var cmd = args[0];
	if(cmd == "rules") {
		bot.sendMessage({
			to:channelID,
			message:"Assemble a group of players. \nFor the first day, go around and have everyone introduce themselves \nDaytime is very simple; all the living players gather in the village and decide who to kill. As soon as a majority of players vote for a particular player to kill, the gamemaster(grabi) says 'Ok, you're dead.'\nAt night the gamemaster tell you to sleep, then he ask oracle, then he ask werewolves who to kill"
		});
	}
	else if(cmd == "dead") {
		if (event.d.mentions.length == 1)  {
		bot.addToRole({
		serverID: server.serverID,
		userID: event.d.mentions[0].id,
		roleID: "335458298369146891"
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
					roleID: "333352501258485760"
				});
			}
			else {
				for (var i = 0; i<event.d.mentions.length; i++) {
					bot.removeFromRole({
						serverID: server.serverID,
						userID: event.d.mentions[i].id,
						roleID: "333352501258485760"
					});
				}
			}
		}
		else {
			bot.sendMessage({
				to:channelID,
				message:"<:error:444107855822454786> you don't have permission to use this command"
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
	else if(cmd == "help") {
		bot.sendMessage({
			to: channelID,
			embed: {
				title: "Help",
				color: 0x00b4fa,
				fields: [
					{
						name : "w:rules",
						value : "show you the game rules",
						inline : true
					},
					{
						name : "w:start",
						value : "start the game, if no players were added via w:add, nothing happend",
						inline : true
					},
					{
						name : help.cmd[2].name,
						value : help.cmd[2].desc,
						inline : true
					}
				]
			}             
		});

	}
	else if (cmd == "add") {
		if(event.d.mentions.length <=15) {
			for(var i = 0; i<event.d.mentions.length; i++) {
				usersID[i] = event.d.mentions[i].id;
			}
		}
	}
	else if(cmd == "role") {
		if(args.length == 1){
			bot.sendMessage({
				to: channelID,
				embed: {
					title: "Roles",
					description : "",
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
		else if(typeof roles[args[1]] !== "undefined") {
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
	else if(cmd == "start") {
		role = ["witch", "hunter", "villager", "werewolf", "oracle", "werewolf"];
		if(usersID.length == 0) return;
		else if(usersID.length == 21) {
			
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
			role.push('villager');
			role.push('villager');
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
		}
		else if(usersID.length == 16) {
			// role = ["witch", "hunter", "villager", "werewolf", "oracle", "werewolf", "werewolf", "werewolf", "villager", "spy", "lone wolf", "amor", "werewolf", "healer", "villager"];
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
		else if(usersID.length == 15) {
			// role = ["witch", "hunter", "villager", "werewolf", "oracle", "werewolf", "werewolf", "werewolf", "villager", "spy", "lone wolf", "amor", "werewolf", "healer", "villager"];
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
			role.push('amor');
			role.push('healer');
			role.push('villager');
		}
		else if(usersID.length == 14) {
			// role = ["witch", "hunter", "villager", "werewolf", "oracle", "werewolf", "werewolf", "werewolf", "villager", "spy", "lone wolf", "amor", "werewolf", "healer"];
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
			role.push('amor');
			role.push('healer');			
		}
		else if(usersID.length == 12) {
			// role = ["witch", "hunter", "villager", "werewolf", "oracle", "werewolf", "werewolf", "werewolf", "villager", "spy", "lone wolf", "amor"];
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
			role.push('amor');
		}
		else if(usersID.length == 11) {
			// role = ["witch", "hunter", "villager", "werewolf", "oracle", "werewolf", "werewolf", "werewolf", "villager", "spy", "lone wolf"];
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
			role.push('villager');
		}
		else if(usersID.length == 10) {
			// role = ["witch", "hunter", "villager", "werewolf", "oracle", "werewolf", "werewolf", "werewolf", "lone wolf", "spy"];
			role.push('lone wolf');
			role.push('werewolf');
			role.push('werewolf');
			role.push('spy');
		}
		else if(usersID.length == 9) {
			// role = ["witch", "hunter", "villager", "werewolf", "oracle", "werewolf", "lone wolf", "werewolf", "spy"];
			role.push('lone wolf');
			role.push('werewolf');
			role.push('spy');
		}
		else if(usersID.length == 8) {
			// role = ["witch", "hunter", "villager", "werewolf", "oracle", "werewolf", "lone wolf", "werewolf"];
			role.push('lone wolf');
			role.push('werewolf');
		}
		else if(usersID.length == 7) {
			role.push('lone wolf');
		}
		else if(usersID.length == 6) {
			role = ["witch", "hunter", "villager", "werewolf", "oracle", "werewolf"];
		}
		// console.log(shuffle(role));
		let r = shuffle(role);
		// for(var u in usersID) {
		// 	// console.log(r[u]);
		// 	game[usersID[u]] = {
		// 		role: r[u],
		// 		username: usersID[u]
		// 	};  
		// }
		
		let val = "";
		let grabiID = "198780988959096832";

		for(let i = 0; i<r.length; i++) {
			bot.sendMessage({
				to: usersID[i],
				message: `Your role is : ${r[i]}`
			});
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