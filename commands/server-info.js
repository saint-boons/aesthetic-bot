module.exports = {
	name: 'server-info',
	description: 'Displays info about the current server.',
	args: false,
    usage: 'no arguments',
    guildOnly: true,
	execute(message, args) {
		message.channel.send(`**Server Name:** ${message.guild.name}\n**Total members:** ${message.guild.memberCount}\n**Server Creation Date:** ${message.guild.createdAt}\n**Server Region:** ${message.guild.region}`);
	},
};