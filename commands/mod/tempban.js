const Discord = require('discord.js');
const { embedColor, embedWarnColor, embedErrorColor, embedFooterText, embedFooterIcon } = require('../../config.json')

module.exports = {
    commands: ['tempban', 'tempoban', 'temp-ban', 'tempo-ban', 'temporaryban', 'temporary-ban'],
    expectedArgs: '<user> <time (1-7 days)> <reason>',
    minArgs: 1,
    requiredRoles: ['Mod'],
    description: "Temporarily ban a member.",
    callback: (client, message, arguments, text) => {
        let targetUser = message.mentions.members.first()
        if (!targetUser) {
            const banErrorEmbed = new Discord.MessageEmbed()
                .setColor(embedErrorColor)
                .setTitle('Temp Ban Error')
                .setDescription(`User \`${arguments[0]}\` cannot be temporarily banned!\nThey could not be found in this server.`)
                .setFooter(embedFooterText, embedFooterIcon);
            message.channel.send(banErrorEmbed);
            return
        }
        let member = targetUser.id
        let time = parseInt(arguments[1])
        let reason = arguments.slice(2).join(" ")
        if (time < 1 || time > 7) {
            const banErrorEmbed = new Discord.MessageEmbed()
                .setColor(embedErrorColor)
                .setTitle('Temp Ban Error')
                .setDescription(`Ban duration cannot be shorter than **1 day** and longer than **7 days**!`)
                .setFooter(embedFooterText, embedFooterIcon);
            message.channel.send(banErrorEmbed);
        }
        if (!reason) {
            reason = 'Unspecifed'
        }
        if (member === message.author.id) {
            const banErrorEmbed = new Discord.MessageEmbed()
                .setColor(embedErrorColor)
                .setTitle('Temp Ban Error')
                .setDescription(`You cannot temporarily ban yourself!`)
                .setFooter(embedFooterText, embedFooterIcon);
            message.channel.send(banErrorEmbed);
            return
        }
        if (!targetUser.bannable) {
            const banErrorEmbed = new Discord.MessageEmbed()
                .setColor(embedErrorColor)
                .setTitle('Temp Ban Error')
                .setDescription(`User <@${member}> cannot be temporarily banned!\n*They might have a higher role than I do.*`)
                .setFooter(embedFooterText, embedFooterIcon);
            message.channel.send(banErrorEmbed);
            return
        } else {
            targetUser.ban({ days: time, reason: `${reason}` }).catch(err => {
                const banErrorEmbed = new Discord.MessageEmbed()
                    .setColor(embedErrorColor)
                    .setTitle('Error')
                    .setDescription(`${err}`)
                    .setFooter(embedFooterText, embedFooterIcon);
                message.channel.send(banErrorEmbed);
                return
            })
            const banEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle('User Temp Banned')
                .setDescription(`User <@${member}> was temporarily banned!`)
                .addFields(
                    { name: 'Banned By', value: `${message.author}`, inline: true },
                    { name: 'Length', value: `${arguments[0]} days`, inline: true },
                    { name: 'Reason', value: `${reason}`, inline: false },
                )
                .setFooter(embedFooterText, embedFooterIcon);
            message.channel.send(banEmbed);
        }
    },
};