const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
    commands: ['ban', 'permban', 'perm-ban', 'permaban', 'perma-ban'],
    expectedArgs: '<user> <reason>',
    minArgs: 1,
    requiredRoles: ['Mod'],
    description: "Ban a member.",
    callback: (client, message, arguments, text) => {
        let memberTag = message.mentions.members.first()
        if (!memberTag) {
            const banErrorEmbed = new Discord.MessageEmbed()
                .setColor(config.embedErrorColor)
                .setTitle('Ban Error')
                .setDescription(`User \`${arguments[0]}\` cannot be permanently banned!\n*They could not be found in this server.*`)
                .setFooter(config.embedFooterText, config.embedFooterIcon);
            message.channel.send(banErrorEmbed);
            return
        }
        let memberID = memberTag.id
        let reason = arguments.slice(1).join(" ")
        if (!reason) {
            reason = 'Unspecifed'
        }
        if (memberID === message.author.id) {
            const banErrorEmbed = new Discord.MessageEmbed()
                .setColor(config.embedErrorColor)
                .setTitle('Ban Error')
                .setDescription(`You cannot permanently ban yourself!`)
                .setFooter(config.embedFooterText, config.embedFooterIcon);
            message.channel.send(banErrorEmbed);
            return
        }
        if (!memberTag.bannable) {
            const banErrorEmbed = new Discord.MessageEmbed()
                .setColor(config.embedErrorColor)
                .setTitle('Ban Error')
                .setDescription(`User ${memberTag} cannot be permanently banned!\n*They might have a higher role than I do.*`)
                .setFooter(config.embedFooterText, config.embedFooterIcon);
            message.channel.send(banErrorEmbed);
            return
        } else {
            memberTag.ban({ reason: `${reason}` }).catch(err => {
                const banErrorEmbed = new Discord.MessageEmbed()
                    .setColor(config.embedErrorColor)
                    .setTitle('Error')
                    .setDescription(`${err}`)
                    .setFooter(config.embedFooterText, config.embedFooterIcon);
                message.channel.send(banErrorEmbed);
                return
            })
            const banEmbed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setTitle('User Banned')
                .setDescription(`User ${memberTag} was permanently banned!`)
                .addFields(
                    { name: 'Banned By', value: `${message.author}`, inline: true },
                    { name: 'Length', value: `\`\`\`PERMANENT\`\`\``, inline: true },
                    { name: 'Reason', value: `\`\`\`${reason}\`\`\``, inline: false },
                )
                .setFooter(config.embedFooterText, config.embedFooterIcon);
            message.channel.send(banEmbed);
        }
    },
};