const Discord = require('discord.js');
const { prefix, consoleInfoPrefix, consoleWarnPrefix, consoleErrorPrefix, embedColor, embedWarnColor, embedErrorColor, embedFooterText, embedFooterIcon } = require('../config.json')
// Chalk
const chalk = require('chalk');
const infoPrefix = chalk.black.bgWhite
const warnPrefix = chalk.black.bgYellow
const errorPrefix = chalk.white.bgRed
const url = chalk.blue.underline
const highlight = chalk.yellow

// Valid Discord permission nodes function
const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS' ,
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBER',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS'
    ]
    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission node: "${permission}"`)
        }
    }
}

module.exports = (client, commandOptions) => {
    let {
        // Defaults - command options
        commands,
        expectedArgs = '',
        minArgs = 0,
        maxArgs = null,
        requiredRoles = [],
        permissions = [],
        permissionError = 'You do not have permission to run this command!',
        callback,
    } = commandOptions

    // Convert string to array - commands
    if (typeof commands === 'string') {
        commands = [commands]
    }

    console.log(infoPrefix(consoleInfoPrefix), `Registering command: "${commands[0]}"`)

    // Convert strong to array - permissions
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }
        // Validate permissions array
        validatePermissions(permissions)
    }

    // Listen for messages
    client.on('message', message => {
        const { member, content, guild } = message

        for (const alias of commands) {
            if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
                // Perms check - permission
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        const permErrEmbed = new Discord.MessageEmbed()
		                        .setColor(embedErrorColor)
		                        .setTitle('Insufficient Permission')
		                        .setDescription(`${permissionError}`)
		                        .setFooter(embedFooterText, embedFooterIcon);

	                        message.channel.send(permErrEmbed);
                        return
                    }
                }

                // Perms check - roles
                for (const requiredRole of requiredRoles) {
                        const role = guild.roles.cache.find(role => role.name === requiredRole)
                        
                        if (!role || !member.roles.cache.has(role.id)) {
                            const roleErrEmbed = new Discord.MessageEmbed()
		                        .setColor(embedErrorColor)
		                        .setTitle('Insufficient Permission')
		                        .setDescription(`You must have \`${requiredRole}\` role to use this command.`)
		                        .setFooter(embedFooterText, embedFooterIcon);

	                        message.channel.send(roleErrEmbed);
                            return
                        }
                }

                // Process arguments
                const arguments = content.split(/[ ]+/)
                arguments.shift()

                // Agument length check
                if (arguments.length < minArgs || (
                    maxArgs !== null && arguments.length > maxArgs
                )) {
                    const syntaxErrEmbed = new Discord.MessageEmbed()
		                .setColor(embedErrorColor)
		                .setTitle('Syntax Error')
		                .setDescription(`Improper syntax. Use: \`${prefix}${alias} ${expectedArgs}\`\nNeed some help? Do: \`${prefix}help\``)
		                .setFooter(embedFooterText, embedFooterIcon);

	                message.channel.send(syntaxErrEmbed);
                    return
                }

                // Handle command
                callback(client, message, arguments, arguments.join(' '))
                return
            }
        }
    })
}