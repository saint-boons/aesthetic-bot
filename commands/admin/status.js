const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
    commands: ['status', 'botstatus', 'bot-status'],
    expectedArgs: '<type> <status> <text>',
    minArgs: 3,
    requiredRoles: ['Admin'],
    description: "Change the bot's status.",
    callback: (client, message, arguments, text) => {
        const type = arguments[0].toUpperCase()
        const status = arguments[1].toLowerCase()
        const value = arguments.slice(2).join(" ")
        var embedType = null
        var embedStatus = null
        switch (type) {
            case 'PLAYING':
                embedType = 'Playing'
                break
            case 'WATCHING':
                embedType = 'Watching'
                break
            case 'LISTENING':
                embedType = 'Listening'
                break
            case 'STREAMING':
                embedType = 'Streaming'
                break
            default:
                const typeErrorEmbed = new Discord.MessageEmbed()
                    .setColor(config.embedErrorColor)
                    .setTitle('Error')
                    .setDescription(`The type \`${arguments[0]}\`does not exist!\nPossible options are: \`playing\`, \`watching\`, \`listening\`, \`streaming\``)
                    .setFooter(config.embedFooterText, config.embedFooterIcon);
                message.channel.send(typeErrorEmbed)
                return
        }
        switch (status) {
            case 'online':
                embedStatus = 'Online'
                break
            case 'idle':
                embedStatus = 'Idle'
                break
            case 'dnd':
                embedStatus = 'Do Not Disturb'
                break
            case 'donotdisturb':
                status = 'dnd'
                embedStatus = 'Do Not Disturb'
                break
            case 'invisible':
                embedStatus = 'Invisible'
                break
            default:
                const statusErrorEmbed = new Discord.MessageEmbed()
                    .setColor(config.embedErrorColor)
                    .setTitle('Error')
                    .setDescription(`The status \`${arguments[1]}\`does not exist!\nPossible options are: \`online\`, \`idle\`, \`dnd\`, \`invisible\`\n*\`dnd\` is Do Not Disturb*`)
                    .setFooter(config.embedFooterText, config.embedFooterIcon);
                message.channel.send(statusErrorEmbed)
                return
        }
        const statusEmbed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('Status Changed')
            .setDescription(`The bot's status was changed.`)
            .addFields(
                { name: 'Type', value: `${embedType}`, inline: false },
                { name: 'Status', value: `${embedStatus}`, inline: false },
                { name: 'Value', value: `${value}`, inline: false },
            )
            .setFooter(config.embedFooterText, config.embedFooterIcon);

        client.user.setPresence({
            status: `${status}`,
            activity: {
                name: `${value}`,
                type: `${type}`
            }
        });
        message.channel.send(statusEmbed)
    },
};