const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
    commands: ['unban', 'unpermban', 'unperm-ban', 'unpermaban', 'unperma-ban', 'untempban', 'untempoban', 'untemp-ban', 'untempo-ban', 'untemporaryban', 'untemporary-ban'],
    expectedArgs: '<userID> <reason>',
    minArgs: 1,
    requiredRoles: ['Mod'],
    description: "Unban a member.",
    callback: (client, message, arguments, text) => {
        let memberID = arguments[0]
        let memberTag = arguments[0].tag
        if (memberTag) {
            const unbanErrorEmbed = new Discord.MessageEmbed()
                .setColor(config.embedErrorColor)
                .setTitle('Unban Error')
                .setDescription(`User <@${memberID}> \`${memberID}\` cannot be unbanned!\n*They are currently in this server.*`)
                .setFooter(config.embedFooterText, config.embedFooterIcon);
            message.channel.send(unbanErrorEmbed);
            return
        }
        
        let reason = arguments.slice(1).join(" ")
        if (!reason) {
            reason = 'Unspecifed'
        }
        if (memberID === message.author.id) {
            const unbanErrorEmbed = new Discord.MessageEmbed()
                .setColor(config.embedErrorColor)
                .setTitle('Unban Error')
                .setDescription(`You cannot unban yourself!`)
                .setFooter(config.embedFooterText, config.embedFooterIcon);
            message.channel.send(unbanErrorEmbed);
            return
        }
        if (!memberID) {
            message.guild.members.unban(memberID).catch(err => {
                const unbanErrorEmbed = new Discord.MessageEmbed()
                    .setColor(config.embedErrorColor)
                    .setTitle('Error')
                    .setDescription(`${err}`)
                    .setFooter(config.embedFooterText, config.embedFooterIcon);
                message.channel.send(unbanErrorEmbed);
                return
            })
            const unbanEmbed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setTitle('User Unbanned')
                .setDescription(`User <@${memberID}> was unbanned!`)
                .addFields(
                    { name: 'Unbanned By', value: `${message.author}`, inline: true },
                    { name: 'Reason', value: `\`\`\`${reason}\`\`\``, inline: false },
                )
                .setFooter(config.embedFooterText, config.embedFooterIcon);
            message.channel.send(unbanEmbed);
        } else {
            const unbanErrorEmbed = new Discord.MessageEmbed()
                .setColor(config.embedErrorColor)
                .setTitle('Unban Error')
                .setDescription(`User <@${memberID}> \`${memberID}\` cannot be unbanned!\n*They are currently in this server.*`)
                .setFooter(config.embedFooterText, config.embedFooterIcon);
            message.channel.send(unbanErrorEmbed);
        }
    },
};