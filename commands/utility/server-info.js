const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
	commands: ['server-info', 'serverinfo', 'guild-info', 'guildinfo'],
	maxArgs: 0,
	description: "Give some information about the server.",
	callback: (client, message, arguments, text) => {
		const serverInfoEmbed = new Discord.MessageEmbed()
		    .setColor(config.embedColor)
		    .setTitle('Server Info')
		    .setDescription('Here are some info on this server.')
		    .addFields(
			    { name: 'Name', value: `\`\`\`${message.guild.name}\`\`\``, inline: false },
			    { name: 'Total Members', value: `\`\`\`${message.guild.memberCount}\`\`\``, inline: false },
				{ name: 'Server Creation Date', value: `\`\`\`${message.guild.createdAt}\`\`\``, inline: false },
				{ name: 'Server Region', value: `\`\`\`${message.guild.region}\`\`\``, inline: false },
		    )
		    .setFooter(config.embedFooterText, config.embedFooterIcon);

	    message.channel.send(serverInfoEmbed);
	},
};