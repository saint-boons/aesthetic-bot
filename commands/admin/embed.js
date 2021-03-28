const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
    commands: ['embed'],
    expectedArgs: '<hex colour / default> <title> <text>',
    minArgs: 3,
    requiredRoles: ['Admin'],
    description: "Send a fancy embed message with the bot.",
    callback: (client, message, arguments, text) => {
        var color = arguments[0].toLowerCase()
        const title = arguments[1]
        const content = arguments.slice(2).join(" ")
        const textEmbed = new Discord.MessageEmbed()
        if (color == 'default') {
            textEmbed.setColor(`${config.embedColor}`)
        } else {
            if (color.length == 6) {
                color = '#' + `${color}`
            }
            var isHex = /^#[0-9A-F]{6}$/i.test(color);
            if (isHex == true) {
                textEmbed.setColor(`${color}`)
            } else {
                const syntaxErrorEmbed = new Discord.MessageEmbed()
                    .setColor(`${config.embedErrorColor}`)
                    .setTitle(`Syntax Error`)
                    .setDescription(`Expecting a valid hex colour code or \`default\`!`)
                    .setFooter(config.embedFooterText, config.embedFooterIcon);
                message.channel.send(syntaxErrorEmbed)
                return
            }
        }
        textEmbed.setTitle(`${title}`)
        textEmbed.setDescription(`${content}`)
        textEmbed.setFooter(config.embedFooterText, config.embedFooterIcon)
        message.delete()
        message.channel.send(textEmbed)
    },
};