module.exports = {
	name: 'user-info',
	description: 'Displays info about the user running the commmand.',
    usage: '<target user> (not required)',
    guildOnly: false,
	execute(message, args) {
		message.channel.send(`**Your username:** ${message.author.username}\n**Your ID:** ${message.author.id}\n**Join Date:** ${message.author.createdAt}`);
	},
};