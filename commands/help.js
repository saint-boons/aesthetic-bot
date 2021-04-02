const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");

// Load commands
const loadCommands = require("./load-commands");

// Load embed module
const embed = require('../modules/embed.js')

// Load YAML module
const loadYAML = require('../modules/yaml.js')
const config = loadYAML('config')

module.exports = {
	commands: ["help"],
	expectedArgs: '<command> / none',
	maxArgs: 1,
	description: "Gives a list of avaliable commands and more info about them.",
	callback: (client, message, arguments, text) => {
		const title = (str) => str.replace(/\b\S/g, (t) => t.toUpperCase());
		if (!arguments[0]) {
			// Not going to touch this embed...
			const embed = new Discord.MessageEmbed()
				.setColor(config.Embeds.Color.Default)
				.setTitle("Command Help")
				.setDescription("Here are the avaliable commands.")
				.setFooter(config.Embeds.Footer.Text, config.Embeds.Footer.Icon);
			const commandsFiles = fs.readdirSync(path.join(__dirname, './'));
			const folders = commandsFiles.filter(command => !command.includes('.js'));
			for (const folder of folders) {
				const commandList = fs.readdirSync(path.join(__dirname, '.', folder));
				const commandListFormat = commandList.join(', ').replace(/\.js/g, '');
				embed.addField(title(folder), `\`\`\`${commandListFormat}\`\`\``, true)
			}
			message.channel.send(embed);
		} else {
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
							var args = ''
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
						if (permissions && requiredRoles) {
							if (hasPermission == true || hasRequiredRole == true) {
								var canRun = 'Yes'
							} else {
								var canRun = 'No'
							}
						} else {
							var canRun = 'Yes'
							var requiredRolesAndPerms = `none`
						}

					} else {
						continue
					}
				}
				message.channel.send(embed('default', `\`${mainCommand}\` Command Help`, `**Description:** ${description}`).addFields(
					{ name: 'Usage', value: `\`\`\`${config.Prefix}${mainCommand} ${args}\`\`\``, inline: false },
					{ name: 'Required Roles & Permissions', value: `\`\`\`${requiredRolesAndPerms}\`\`\``, inline: true },
					{ name: 'Accessible', value: `\`\`\`${canRun}\`\`\``, inline: true },
				))
			} else {
				message.channel.send(embed('error', `Unknown Command`, `\`${arguments[0]}\` does not exist`))
			}
		}
	}
}