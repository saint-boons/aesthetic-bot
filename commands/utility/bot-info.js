const Discord = require('discord.js');
const config = require('../../config.json')
const { version } = require('../../package.json')

module.exports = {
	commands: ['bot-info', 'botinfo'],
    maxArgs: 0,
    description: "Gives some information on the bot.",
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
        const botInfoEmbed = new Discord.MessageEmbed()
		    .setColor(config.embedColor)
		    .setTitle('Bot Info')
		    .setDescription('Here are some info on the bot.')
		    .addFields(
			    { name: 'Name', value: `${message.client.user}`, inline: false },
			    { name: 'Server Count', value: `\`\`\`${message.client.guilds.cache.size}\`\`\``, inline: false },
				{ name: 'Uptime', value: `\`\`\`${uptimeFormated}\`\`\``, inline: false },
                { name: 'Version', value: `\`\`\`v${version}\`\`\``, inline: false },
				{ name: 'Creator', value: `FrenchBones (https://frenchbones.net)`, inline: false },
		    )
		    .setFooter(config.embedFooterText, config.embedFooterIcon);

	    message.channel.send(botInfoEmbed);
	},
};