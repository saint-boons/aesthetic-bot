module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: false,
    usage: 'no arguments',
    guildOnly: false,
	execute(message, args) {
		message.channel.send('**Pong.**');
	},
};