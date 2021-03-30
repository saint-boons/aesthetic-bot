const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
    commands: ['kick'],
    expectedArgs: '<user> <reason>',
    minArgs: 1,
    requiredRoles: ['Mod'],
    description: "Kick a member.",
    callback: (client, message, arguments, text) => {
        let targetUser = message.mentions.members.first()
        if (!targetUser) {
            const kickErrorEmbed = new Discord.MessageEmbed()
                .setColor(config.embedErrorColor)
                .setTitle('Kick Error')
                .setDescription(`User \`${arguments[0]}\` cannot be kicked!\n*They could not be found in this server.*`)
                .setFooter(config.embedFooterText, config.embedFooterIcon);
            message.channel.send(kickErrorEmbed);
            return
        }
        let member = targetUser.id
        let reason = arguments.slice(1).join(" ")
        if (!reason) {
            reason = 'Unspecifed'
        }
        if (member === message.author.id) {
            const kickErrorEmbed = new Discord.MessageEmbed()
                .setColor(config.embedErrorColor)
                .setTitle('Kick Error')
                .setDescription(`You cannot kick yourself!`)
                .setFooter(config.embedFooterText, config.embedFooterIcon);
            message.channel.send(kickErrorEmbed);
            return
        }
        if (!targetUser.kickable) {
            const kickErrorEmbed = new Discord.MessageEmbed()
                .setColor(config.embedErrorColor)
                .setTitle('Kick Error')
                .setDescription(`User <@${member}> cannot be kicked!\n*They might have a higher role than I do.*`)
                .setFooter(config.embedFooterText, config.embedFooterIcon);
            message.channel.send(kickErrorEmbed);
            return
        } else {
            targetUser.kick({ reason: `${reason}` }).catch(err => {
                const kickErrorEmbed = new Discord.MessageEmbed()
                    .setColor(config.embedErrorColor)
                    .setTitle('Error')
                    .setDescription(`${err}`)
                    .setFooter(config.embedFooterText, config.embedFooterIcon);
                message.channel.send(kickErrorEmbed);
                return
            })
            const kickEmbed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setTitle('User Kicked')
                .setDescription(`User <@${member}> was kicked!`)
                .addFields(
                    { name: 'Kicked By', value: `${message.author}`, inline: true },
                    { name: 'Reason', value: `\`\`\`${reason}\`\`\``, inline: false },
                )
                .setFooter(config.embedFooterText, config.embedFooterIcon);
            message.channel.send(kickEmbed);
        }
    },
};