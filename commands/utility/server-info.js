const Discord = require('discord.js');
const { embedColor, embedWarnColor, embedErrorColor, embedFooterText, embedFooterIcon } = require('../../config.json')

module.exports = {
	commands: ['server-info', 'serverinfo', 'guild-info', 'guildinfo'],
	maxArgs: 0,
	callback: (client, message, arguments, text) => {
		const serverInfoEmbed = new Discord.MessageEmbed()
		    .setColor(embedColor)
		    .setTitle('Server info')
		    .setDescription('Here are some info on this server.')
		    .addFields(
			    { name: 'Name', value: `${message.guild.name}`, inline: false },
			    { name: 'Total Members', value: `${message.guild.memberCount}`, inline: false },
				{ name: 'Server Creation Date', value: `${message.guild.createdAt}`, inline: false },
				{ name: 'Server Region', value: `${message.guild.region}`, inline: false },
		    )
		    .setFooter(embedFooterText, embedFooterIcon);

	    message.channel.send(serverInfoEmbed);
	},
};