const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const config = require("../config.json");
const loadCommands = require("./load-commands");
const { requiredRoles } = require("./mod/ban");

module.exports = {
	commands: ["help"],
	expectedArgs: '<command> / none',
	maxArgs: 1,
	description: "Gives a list of avaliable commands and more info about them.",
	callback: (client, message, arguments, text) => {
		const title = (str) => str.replace(/\b\S/g, (t) => t.toUpperCase());
		if (!arguments[0]) {
			const helpEmbed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle("Command Help")
				.setDescription("Here are the avaliable commands.")
				.setFooter(config.embedFooterText, config.embedFooterIcon);
			const commandsFiles = fs.readdirSync(path.join(__dirname, './'));
			const folders = commandsFiles.filter(command => !command.includes('.js'));
			for (const folder of folders) {
				const commandList = fs.readdirSync(path.join(__dirname, '.', folder));
				const commandListFormat = commandList.join(', ').replace(/\.js/g, '');
				helpEmbed.addField(title(folder), `\`\`\`${commandListFormat}\`\`\``, true)
			}
			message.channel.send(helpEmbed);
		} else {
			const specificHelpEmbed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setFooter(config.embedFooterText, config.embedFooterIcon);
			const commands = loadCommands()
			let allCommands = []
			for (const command of commands) {
				Array.prototype.push.apply(allCommands, command.commands)
			}
			if (allCommands.includes(arguments[0])) {
				for (const command of commands) {
					if (command.commands.includes(arguments[0])) {
						// Perm check - permissions
						let permissions = command.permissions
						var hasPermission = false
						if (permissions) {
							if (typeof permissions === 'string') {
								permissions = [permissions]
							}
							for (const permission of permissions) {
								var requiredPermsForField = permissions.toString()
								var sperator = ' | '
								if (message.member.hasPermission(permission)) {
									hasPermission = true
								} else {
									hasPermission = false
								}
							}
						}
						// Perm check - roles
						const { guild } = message
						let requiredRoles = command.requiredRoles
						var hasRequiredRole = false
						if (requiredRoles) {
							if (typeof requiredRoles === 'string') {
								requiredRoles = [requiredRoles]
							}
							for (const requiredRole of requiredRoles) {
								const role = message.guild.roles.cache.find(role => role.name === requiredRole);
								var requiredRolesForField = requiredRoles.toString()
								if (message.member.roles.cache.has(role.id)) {
									var hasRequiredRole = true
								} else {
									var hasRequiredRole = false
								}
							}
						}
						var mainCommand = typeof command.commands === 'string' ? command.commands : command.commands[0]
						if (command.expectedArgs) {
							var args = command.expectedArgs
						} else {
							var args = 'none'
						}
						var { description } = command
						if (!requiredRolesForField) {
							var requiredRolesForField = ''
							var sperator = ''
						}
						if (!requiredPermsForField) {
							var requiredPermsForField = ''
							var sperator = ''
						}
						if (requiredRolesForField || requiredPermsForField) {
							var requiredRolesAndPerms = `${requiredRolesForField}${sperator}${requiredPermsForField}`
						}
						if (hasPermission == true || hasRequiredRole == true) {
							var canRun = 'Yes'
						} else {
							var canRun = 'No'
						}
					} else {
						continue
					}
				}
				specificHelpEmbed.setTitle(`\`${mainCommand}\` Command Help`)
				specificHelpEmbed.setDescription(`**Description:** ${description}`)
				specificHelpEmbed.addFields(
					{ name: 'Usage', value: `\`\`\`${config.prefix}${mainCommand} ${args}\`\`\``, inline: false },
					{ name: 'Required Roles & Permissions', value: `\`\`\`${requiredRolesAndPerms}\`\`\``, inline: true },
					{ name: 'Accessible', value: `\`\`\`${canRun}\`\`\``, inline: true },
					)
				message.channel.send(specificHelpEmbed);
			} else {
				const helpErrorEmbed = new Discord.MessageEmbed()
					.setColor(config.embedErrorColor)
					.setTitle(`Help Error`)
					.setDescription(`\`${arguments[0]}\` does not exist`)
					.setFooter(config.embedFooterText, config.embedFooterIcon);
				message.channel.send(helpErrorEmbed);
			}
		}
	}
}