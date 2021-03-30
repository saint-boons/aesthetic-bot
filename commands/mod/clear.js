const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
	commands: ['clear', 'clean'],
    expectedArgs: '<number>',
    minArgs: 1,
    maxArgs: 1,
    requiredRoles: ['Mod'],
    description: "Clear a certain number of messages at once.",
	callback: (client, message, arguments, text) => {
		if (arguments == 'all') {
            message.channel.messages.fetch().then(results => {
                message.channel.bulkDelete(results, true)
            })
        } else {
            let nMessages = parseInt(arguments)
            
            if (isNaN(nMessages) || (nMessages < 1 || nMessages > 99)) {
                const syntaxErrEmbed = new Discord.MessageEmbed()
		            .setColor(config.embedErrorColor)
		            .setTitle('Syntax Error')
		            .setDescription(`Expecting a \`number (1-99)\` or \`all\` as an argument`)
		            .setFooter(config.embedFooterText, config.embedFooterIcon);

	            message.channel.send(syntaxErrEmbed);
            } else {
                try {
                    message.channel.bulkDelete(nMessages + 1, true)
                    const successEmbed = new Discord.MessageEmbed()
		                .setColor(config.embedColor)
		                .setTitle('Success')
		                .setDescription(`**${nMessages}** message(s) cleared!`)
		                .setFooter(config.embedFooterText, config.embedFooterIcon);

	                message.channel.send(successEmbed)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    })
                } catch {
                    const syntaxErrEmbed = new Discord.MessageEmbed()
		                .setColor(config.embedErrorColor)
		                .setTitle('Error')
		                .setDescription(`The messages you are trying to delete are older than 14 days and therefore cannot be deleted.`)
		                .setFooter(config.embedFooterText, config.embedFooterIcon);

	                message.channel.send(syntaxErrEmbed);
                };
            }
        }
	},
};