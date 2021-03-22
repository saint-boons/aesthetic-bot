const Discord = require('discord.js');
const { embedColor, embedWarnColor, embedErrorColor, embedFooterText, embedFooterIcon } = require('../../config.json')

module.exports = {
	commands: ['bot-info', 'botinfo'],
    maxArgs: 0,
	callback: (client, message, arguments, text) => {
        if (message.client.uptime < 60000) {
            uptimeFormated = Math.round(message.client.uptime / 1000) + ' second(s)'
        }
        if (message.client.uptime >= 60000 && message.client.uptime < 3600000) {
            uptimeFormated = Math.round(message.client.uptime / 60000) + ' minute(s)'
        }
        if (message.client.uptime >= 3600000 && message.client.uptime < 86400000) {
            uptimeFormated = Math.round(message.client.uptime / 360000) + ' hour(s)'
        }
        if (message.client.uptime >= 86400000) {
            uptimeFormated = Math.round(message.client.uptime / 86400000) + ' day(s)'
        }
        const serverInfoEmbed = new Discord.MessageEmbed()
		    .setColor(embedColor)
		    .setTitle('Bot info')
		    .setDescription('Here are some info on the bot.')
		    .addFields(
			    { name: 'Name', value: `${message.client.user}`, inline: false },
			    { name: 'Server Count', value: `${message.client.guilds.cache.size}`, inline: false },
				{ name: 'Uptime', value: `${uptimeFormated}`, inline: false },
				{ name: 'Bot Creator', value: `FrenchBones (https://frenchbones.net)`, inline: false },
		    )
		    .setFooter(embedFooterText, embedFooterIcon);

	    message.channel.send(serverInfoEmbed);
        '**Bot name:** ${message.client.user}\n**Server Count:** ${message.client.guilds.cache.size}\n**Uptime:**  + Math.round(message.client.uptime / 1000) + `s *(` + Math.round(message.client.uptime / 60000) + `m)* \n**Bot Creator:** FrenchBones (<https://discord.gg/7T24Mrw>, <https://frenchbones.net>)'
	},
};