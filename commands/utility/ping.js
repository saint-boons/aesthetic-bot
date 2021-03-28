const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
    commands: ['ping'],
	description: "Check the bot's and api latency.",
    callback: (client, message, agruments, text) => {
        const ping = new Date().getTime() - message.createdTimestamp;
	    const pingEmbed = new Discord.MessageEmbed()
		    .setColor(config.embedColor)
		    .setTitle('Ping Results')
		    .setDescription('Here are the detailed ping results!')
		    .addFields(
			    { name: 'Bot Latency', value: `**${ping}** ms`, inline: true },
			    { name: 'API Latency', value: `**${client.ws.ping}** ms`, inline: true },
		    )
		    .setFooter(config.embedFooterText, config.embedFooterIcon);

	    message.channel.send(pingEmbed);
    },
}