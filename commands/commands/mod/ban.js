// Load embed module
const embed = require('@modules/embed.js')

// Load YAML module
const loadYAML = require('@modules/yaml.js')
const config = loadYAML('config')

module.exports = {
    commands: ['ban', 'permban', 'perm-ban', 'permaban', 'perma-ban'],
    expectedArgs: '<user> <reason>',
    minArgs: 1,
    requiredRoles: ['Mod'],
    serverOnly: true,
    description: "Ban a member.",
    callback: (client, message, arguments) => {
        let memberTag = message.mentions.members.first()
        if (!memberTag) {
            message.channel.send(embed('error', `Ban`, `User \`${arguments[0]}\` cannot be permanently banned!\n*They could not be found in this server.*`))
            return
        }
        let memberID = memberTag.id
        let reason = arguments.slice(1).join(" ")
        if (!reason) {
            reason = 'Unspecifed'
        }
        if (memberID === message.author.id) {
            message.channel.send(embed('error', `Ban`, `You cannot permanently ban yourself!`))
            return
        }
        if (!memberTag.bannable) {
            message.channel.send(embed('error', `Ban`, `User ${memberTag} cannot be permanently banned!\n*They might have a higher role than I do.*`))
            return
        } else {
            memberTag.ban({ reason: `${reason}` }).catch(err => {
                message.channel.send(embed('error', `Unknown`, `${err}`))
                return
            })
            message.channel.send(embed('default', `User Banned`, `User ${memberTag} was permanently banned!`).addFields(
                { name: 'Banned By', value: `${message.author}`, inline: true },
                { name: 'Length', value: `\`\`\`PERMANENT\`\`\``, inline: true },
                { name: 'Reason', value: `\`\`\`${reason}\`\`\``, inline: false },
            ))
        }
    },
};