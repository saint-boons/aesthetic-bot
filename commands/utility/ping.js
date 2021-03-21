module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: false,
    usage: 'no arguments',
    guildOnly: false,
	execute(message, args) {
		const ping = resultMessage.createdTimestamp - message.createdTimestamp
		const pingEmbed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('Ping Results')
			.setDescription('Here are the detailed ping results!')
			.setThumbnail('https://i.imgur.com/wSTFkRM.png')
			.addFields(
				{ name: 'BOT Latency', value: `${ping} ms`, inline: true },
				{ name: 'API Latency', value: `${client.ws.ping} ms`, inline: true },
			)
			.setImage('https://i.imgur.com/wSTFkRM.png')
			.setFooter(embedFooterText, embedFooterIcon);

		message.channel.send(pingEmbed);
	},
};