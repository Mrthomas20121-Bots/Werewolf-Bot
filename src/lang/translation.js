module.exports = {
    // bot errors
    'error.arguments': 'Error %s arguments given, Expected %s arguments.',
    'error.not_found': 'Error, %s %s not found!',
    'error.command.invalid': 'Error, Invalid Usage of the command!',

    // commands
    'command.lobby.description': 'Create or Join a Lobby',
    'command.join_lobby.description': 'Join a lobby',
    'command.join_lobby.full_description': 'Join a Werewolf lobby',
    'command.create_lobby.description': 'Create a lobby',
    'command.create_lobby.full_description': 'Create a lobby with a name. React to join the current lobby or use the command joinLobby <Lobby Name> to join said lobby',
    'command.role.description': 'Role command.',
    'command.role.list.description': 'List available roles and what they do.',
    'command.role.view.description': 'View a role.',
    'command.check_for_dead.description': 'Check if someone died this night.',
    
    // messages
    'message.player.role': '%s role was %s.',
    'message.player.was_killed_at_night': '%s was killed last night by %s.',
    'message.player.kill': 'you killed %s',
    'message.player.killed_by': 'You were killed by a %s',
    'message.witch.confirm_kill': 'Are you sure you want to kill %s?',
    'message.witch.confirm_heal': 'Are you sure you want to heal %s?',
    'message.werewolf.kill': 'Werewolves decided to kill %s',

    // lobby
    'message.lobby.joined': '%s joined %s lobby.',
    'message.lobby.left': '%s left %s lobby.',
    'message.lobby.join': 'click on ⬆️ to join ***%s*** lobby.',
    
    // roles
    'role.werewolf.name': 'Werewolf',
    'role.werewolf.desc': 'Every night they pick one person to kill.\nIf they cannot decide in time they will not kill anyone.',
    
    'role.hunter.name': 'Hunter',
    'role.hunter.desc': 'he may kill someone upon dying',
    
    'role.witch.name': 'Witch',
    'role.witch.desc': 'The witch knows who was killed by the werewolf, if she has her healing potion that is.\nIn that case she may heal the wounded person to save their life.\nShe also has a killing potion, allowing her to kill any person during nighttime.\nImportant to note: She may heal herself in advance to get an additional life.',
    
    'role.healer.name': 'Healer',
    'role.healer.desc': 'The Healer gets to heal 1 person every night.\nHowever, unlike the witch, he/she has no idea who was attacked.',

    'role.oracle.name': 'Oracle',
    'role.oracle.desc': 'At the start of the night the oracle gets to choose one person and i will tell the oracle their role.',

    'role.amor.name': 'Amor',
    'role.amor.desc': 'In the first night the Amor gets to choose two people.\n Those two players will fall in love and instantly start teaming up, no matter their roles.\nThe couple can only win if\n**1)** Both of the lovers are from the town: Every werewolf and the town has to die\n**2)** One of the lovers is a Werewolf: The entire town has to die\n**3)** Both lovers are Werewolves: The entire town and the Werewolves have to die.',

    'role.spy.name': 'Spy',
    'role.spy.desc': 'The spy gets to pretend to be a werewolf and joins their chat.\nHe gets to vote on the person who gets killed and his vote does count.\nHowever, as usual he may not reveal any roles, he may not hint at any roles and - most importantly - If the werewolves find out who he is, he dies Instantly.\nNot even the Witch/Healer can save him.\n Said death does not count as the killed person for the werewolves, meaning they may kill an additional person.',

    'role.lonewolf.name': 'Lonewolf',
    'role.lonewolf.desc': 'The lone wolf only wins if he is the last remaining werewolf.\nHe may not kill any of his fellow werewolves at night, but he may accuse them during daytime.',

    'role.villager.name': 'Villager',
    'role.villager.desc': 'Does Nothing.'
}