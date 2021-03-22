const Discord = require('discord.js');
const { embedColor, embedWarnColor, embedErrorColor, embedFooterText, embedFooterIcon } = require('../../config.json')

module.exports = {
	commands: ['clear', 'clean'],
    expectedArgs: '<number>',
    minArgs: 1,
    maxArgs: 1,
    requiredRoles: ['Mod'],
	callback: (client, message, arguments, text) => {
		if (arguments == 'all') {
            message.channel.messages.fetch().then(results => {
                message.channel.bulkDelete(results)
            })
        } else {
            let nMessages = parseInt(arguments)
            
            if (isNaN(nMessages) || (nMessages < 1 || nMessages > 100)) {
                const syntaxErrEmbed = new Discord.MessageEmbed()
		            .setColor(embedErrorColor)
		            .setTitle('Syntax Error')
		            .setDescription(`Expecting a \`number (1-1000)\` or \`all\` as an argument`)
		            .setFooter(embedFooterText, embedFooterIcon);

	            message.channel.send(syntaxErrEmbed);
            } else {
                try {
                    message.channel.bulkDelete(nMessages + 1, true)
                    const successEmbed = new Discord.MessageEmbed()
		                .setColor(embedColor)
		                .setTitle('Success')
		                .setDescription(`**${nMessages}** messages were deleted!`)
		                .setFooter(embedFooterText, embedFooterIcon);

	                message.channel.send(successEmbed);
                } catch {
                    const syntaxErrEmbed = new Discord.MessageEmbed()
		                .setColor(embedErrorColor)
		                .setTitle('Error')
		                .setDescription(`The messages you are trying to delete are older than 14 days and therefore cannot be deleted.`)
		                .setFooter(embedFooterText, embedFooterIcon);

	                message.channel.send(syntaxErrEmbed);
                };
            }
        }
	},
};