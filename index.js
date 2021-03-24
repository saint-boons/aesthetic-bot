const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const loadCommands = require('./commands/load-commands')
const { consoleInfoPrefix, consoleWarnPrefix, consoleErrorPrefix } = require('./config.json')
const { version } = require('./package.json')

// Env
require('dotenv').config();
const token = process.env.DISCORD_TOKEN

// Chalk
const chalk = require('chalk');
const infoPrefix = chalk.black.bgWhite
const warnPrefix = chalk.black.bgYellow
const errorPrefix = chalk.white.bgRed
const url = chalk.blue.underline
const highlight = chalk.yellow

client.on('ready', async () => {
    // Console startup messages
    console.log(infoPrefix(consoleInfoPrefix), `Loged on as ` + highlight(`${client.user.tag}`) + ` in ` + highlight(`${client.guilds.cache.size}`) + ` server(s) at ` + highlight(`${client.readyAt}`) + `.`);
	console.log(infoPrefix(consoleInfoPrefix), `Bot created by ` + highlight(`FrenchBones`) + ` ` + url(`(https://frenchbones.net)`) + `. Please give credit when using my bot!`)
	console.log(infoPrefix(consoleInfoPrefix), `Bot version:`, highlight(version), `\n`)

    // Start up commands
    client.user.setPresence({
        status: `dnd`,
        activity: {
            name: `commands`,
            type: `LISTENING`
        }
    });

    //Command handler
    loadCommands(client)
})

// Bot login
client.login(token);