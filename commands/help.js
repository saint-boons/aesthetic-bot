const Discord = require('discord.js');
const config = require('../config.json')
const loadCommands = require('./load-commands')

module.exports = {
	commands: ['help'],
	description: "Gives a list of avaliable commands and more info about them.",
	callback: (client, message, arguments, text) => {
		const helpEmbed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Command Help')
			.setDescription('Here is a list of all avaliable commands.')
			.setFooter(config.embedFooterText, config.embedFooterIcon);
		const commands = loadCommands()

		for (const command of commands) {
			// Perm check
			let permissions = command.permissions
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
			// Role check
			let requiredRoles = command.requiredRoles
			if (requiredRoles) {
				let hasRequiredRole = true
				if (typeof requiredRoles === 'string') {
					requiredRoles = [requiredRoles]
				}
				for (const requiredRole of requiredRoles) {
					if (!message.member.roles.cache.has(requiredRole)) {
						hasRequiredRole = false
						break
					}
				}
				if (!hasRequiredRole) {
					continue
				}
			}

			// Format
			const mainCommand = typeof command.commands === 'string' ? command.commands : command.commands[0]
			const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
			const { description } = command
			const title = str => str.replace(/\b\S/g, t => t.toUpperCase());
			const mainCommandTitle = title(mainCommand)
			helpEmbed.addField(`${mainCommandTitle}`, `\`${config.prefix}${mainCommand}${args}\`\n*${description}*`, false)
		}
		message.channel.send(helpEmbed);
	},
};