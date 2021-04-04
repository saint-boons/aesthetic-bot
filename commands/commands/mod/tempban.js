// Load embed module
const embed = require('@modules/embed.js')

// Load YAML module
const loadYAML = require('@modules/yaml.js')
const config = loadYAML('config')

module.exports = {
    commands: ['tempban', 'tempoban', 'temp-ban', 'tempo-ban', 'temporaryban', 'temporary-ban'],
    expectedArgs: '<user> <time (1-7 days)> <reason>',
    minArgs: 1,
    requiredRoles: ['Mod'],
    serverOnly: true,
    description: "Temporarily ban a member.",
    callback: (client, message, arguments) => {
        let targetUser = message.mentions.members.first()
        if (!targetUser) {
            message.channel.send(embed('error', `Temp Ban`, `User \`${arguments[0]}\` cannot be temporarily banned!\nThey could not be found in this server.`))
            return
        }
        let member = targetUser.id
        let time = parseInt(arguments[1])
        let reason = arguments.slice(2).join(" ")
        if (time < 1 || time > 7) {
            message.channel.send(embed('error', `Temp Ban`, `Ban duration cannot be shorter than **1 day** and longer than **7 days**!`))
        }
        if (!reason) {
            reason = 'Unspecifed'
        }
        if (member === message.author.id) {
            message.channel.send(embed('error', `Temp Ban`, `You cannot temporarily ban yourself!`))
            return
        }
        if (!targetUser.bannable) {
            message.channel.send(embed('error', `Temp Ban`, `User <@${member}> cannot be temporarily banned!\n*They might have a higher role than I do.*`))
            return
        } else {
            targetUser.ban({ days: time, reason: `${reason}` }).catch(err => {
                message.channel.send(embed('error', `Unknown`, `${err}`))
                return
            })
            message.channel.send(embed('default', `User Temp Banned`, `User <@${member}> was temporarily banned!`).addFields(
                { name: 'Banned By', value: `${message.author}`, inline: true },
                { name: 'Length', value: `\`\`\`${arguments[0]} days\`\`\``, inline: true },
                { name: 'Reason', value: `\`\`\`${reason}\`\`\``, inline: false },
            ))
        }
    },
};