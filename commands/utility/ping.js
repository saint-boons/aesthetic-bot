const Discord = require('discord.js');
const { embedColor, embedWarnColor, embedErrorColor, embedFooterText, embedFooterIcon } = require('../../config.json')

module.exports = {
    commands: ['ping'],
    callback: (client, message, agruments, text) => {
        const ping = new Date().getTime() - message.createdTimestamp;
	    const pingEmbed = new Discord.MessageEmbed()
		    .setColor(embedColor)
		    .setTitle('Ping Results')
		    .setDescription('Here are the detailed ping results!')
		    .addFields(
			    { name: 'BOT Latency', value: `**${ping}** ms`, inline: true },
			    { name: 'API Latency', value: `**${client.ws.ping}** ms`, inline: true },
		    )
		    .setFooter(embedFooterText, embedFooterIcon);

	    message.channel.send(pingEmbed);
    },
}