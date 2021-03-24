const Discord = require('discord.js');
const { embedColor, embedWarnColor, embedErrorColor, embedFooterText, embedFooterIcon } = require('../config.json')
const loadCommands = require('./load-commands')
const { prefix } = require('../config.json')

module.exports = {
	commands: ['help'],
	description: "Gives a list of avaliable commands and more info about them.",
	callback: (client, message, arguments, text) => {
		const helpEmbed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setTitle('Command Help')
			.setDescription('Here is a list of all avaliable commands.')
			.setFooter(embedFooterText, embedFooterIcon);
		const commands = loadCommands()

		for (const command of commands) {
			// Perm check
			let permissions = command.permission
			if (permissions) {
				let hasPermission = true
				if (typeof permissions === 'string') {
					permissions = [permissions]
				}
				for (const permission of permissions) {
					if (!message.member.hasPermission(permission)) {
						hasPermission = false
						break
					}
				}
				if (!hasPermission) {
					continue
				}
			}
			// Format
			const mainCommand = typeof command.commands === 'string' ? command.commands : command.commands[0]
			const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
			const { description } = command
			const title = str => str.replace(/\b\S/g, t => t.toUpperCase());
			const mainCommandTitle = title(mainCommand)
			helpEmbed.addField(`${mainCommandTitle}`, `\`${prefix}${mainCommand}${args}\`\n*${description}*`, false)
		}
		message.channel.send(helpEmbed);
	},
};