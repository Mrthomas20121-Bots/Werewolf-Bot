module.exports = {
	'commands' : [
		{
			'name': 'howtoplay',
			'args': [],
			'desc': 'Show you how to play a game of werewolf.',
			'text': 'At the start of the game, each player is secretly assigned a role affiliated with one of these teams. \nThe game has two alternating phases: \'Night\', during which each player sleep while players with a role do stuff and \'Day\', in which surviving players debate the identities of the werewolves and vote to eliminate a suspect. \nThe game continues until all of the werewolves have been eliminated or until the werewolves outnumber the innocents.'
		},
		{
			'name': 'start',
			'args': [],
			'desc': 'Start a game with the current lobby members.',
			'text': 'Start a game with the current lobby members. Require Lobby Members'
		},
		{
			'name': 'lobby',
			'args': ['add', '<player>'],
			'desc': 'Add player to a new lobby.',
			'text': 'Add player to a new Lobby.\nUse {prefix}start to start a game of werewolf.'
		},
		{
			'name': 'voteAtNight',
			'args': ['<player name>'],
			'desc': 'Werewolves vote a player at night.',
			'text': 'Werewolves vote a player at night.'
		},
		{
			'name': 'reset',
			'args': [],
			'desc': 'Reset the current game.',
			'text': 'Reset the current game.'
		},
		{
			'name': 'role',
			'args': ['<role name @optional>'],
			'desc': 'Show The available roles to play with.',
			'text': 'Show The available roles to play with.\nYou can add the role as a extra parameter to show info about that role only.'
		}
	]
}
