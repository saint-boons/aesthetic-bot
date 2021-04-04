const { version } = require('@root/package.json')

// Load embed module
const embed = require('@modules/embed.js')

// Load YAML module
const loadYAML = require('@modules/yaml.js')
const config = loadYAML('config')

module.exports = {
	commands: ['bot-info', 'botinfo'],
    description: "Get some information on the bot.",
	callback: (client, message) => {
        if (message.client.uptime < 60000) {
            uptimeFormated = Math.round(message.client.uptime / 1000) + ' second(s)'
        }
        if (message.client.uptime >= 60000 && message.client.uptime < 3600000) {
            uptimeFormated = Math.round(message.client.uptime / 60000) + ' minute(s)'
        }
        if (message.client.uptime >= 3600000 && message.client.uptime < 86400000) {
            uptimeFormated = Math.round(message.client.uptime / 360000) + ' hour(s)'
        }
        if (message.client.uptime >= 86400000) {
            uptimeFormated = Math.round(message.client.uptime / 86400000) + ' day(s)'
        }
        message.channel.send(embed('default', `Bot Info`, `Here is some info on the bot.`).addFields(
            { name: 'Name', value: `${message.client.user}`, inline: false },
            { name: 'Server Count', value: `\`\`\`${message.client.guilds.cache.size}\`\`\``, inline: false },
            { name: 'Uptime', value: `\`\`\`${uptimeFormated}\`\`\``, inline: false },
            { name: 'Version', value: `\`\`\`v${version}\`\`\``, inline: false },
            { name: 'Creator', value: `FrenchBones (https://frenchbones.net)`, inline: false },
        ))
	},
};