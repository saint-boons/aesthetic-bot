const Discord = require('discord.js');
const { embedColor, embedWarnColor, embedErrorColor, embedFooterText, embedFooterIcon } = require('../../config.json')

module.exports = {
	commands: ['user-info', 'userinfo'],
    expectedArgs: '<user> or NONE',
    maxArgs: 1,
	callback: (client, message, arguments, text) => {
        const userInfoEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setFooter(embedFooterText, embedFooterIcon)
            if (!message.mentions.users.size) {
                userInfoEmbed.setTitle('Your User Info')
                userInfoEmbed.addField('Usnername', `${message.author.username}`, false)
                userInfoEmbed.addField('ID', `${message.author.id}`, false)
                userInfoEmbed.addField('Account Creation Date', `${message.author.createdAt}`, false)
                userInfoEmbed.setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
                message.channel.send(userInfoEmbed)
                return
            }
            const otherUserInfo = message.mentions.users.map(user => {
                userInfoEmbed.setTitle(`${user.username}'s User Info`)
                userInfoEmbed.addField('Usnername', `${user.username}`, false)
                userInfoEmbed.addField('ID', `${user.id}`, false)
                userInfoEmbed.addField('Account Creation Date', `${user.createdAt}`, false)
                userInfoEmbed.setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
                return
            });
            message.channel.send(userInfoEmbed)
	},
};