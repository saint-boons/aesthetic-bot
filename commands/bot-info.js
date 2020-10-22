module.exports = {
	name: 'bot-info',
	description: 'Displays info about the bot.',
	args: false,
    usage: 'no arguments',
    guildOnly: true,
	execute(message, args) {
		message.channel.send(`**Bot name:** ${message.client.user}\n**Server Count:** ${message.client.guilds.cache.size}\n**Uptime:** ` + Math.round(message.client.uptime / 1000) + `s *(` + Math.round(message.client.uptime / 60000) + `m)* \n**Bot Creator:** FrenchBones (<https://discord.gg/7T24Mrw>, <https://frenchbones.github.io>)`);
	},
};