// Load embed module
const embed = require('@modules/embed.js')

// Load YAML module
const loadYAML = require('@modules/yaml.js')
const config = loadYAML('config')

module.exports = {
    commands: ['unban', 'unpermban', 'unperm-ban', 'unpermaban', 'unperma-ban', 'untempban', 'untempoban', 'untemp-ban', 'untempo-ban', 'untemporaryban', 'untemporary-ban'],
    expectedArgs: '<userID> <reason>',
    minArgs: 1,
    requiredRoles: ['Mod'],
    serverOnly: true,
    description: "Unban a member.",
    callback: (client, message, arguments) => {
        let memberID = arguments[0]
        let memberTag = arguments[0].tag
        if (memberTag) {
            message.channel.send(embed('error', `Unban`, `User <@${memberID}> \`${memberID}\` cannot be unbanned!\n*They are currently in this server.*`))
            return
        }
        
        let reason = arguments.slice(1).join(" ")
        if (!reason) {
            reason = 'Unspecifed'
        }
        if (memberID === message.author.id) {
            message.channel.send(embed('error', `Unban`, `You cannot unban yourself!`))
            return
        }
        if (!memberID) {
            message.guild.members.unban(memberID).catch(err => {
                message.channel.send(embed('error', `Unknown`, `${err}`))
                return
            })
            message.channel.send(embed('default', `User Unbanned`, `User <@${memberID}> was unbanned!`).addFields(
                { name: 'Unbanned By', value: `${message.author}`, inline: true },
                { name: 'Reason', value: `\`\`\`${reason}\`\`\``, inline: false },
            ))
        } else {
            message.channel.send(embed('error', `Unban`, `User <@${memberID}> \`${memberID}\` cannot be unbanned!\n*They are currently in this server.*`))
        }
    },
};