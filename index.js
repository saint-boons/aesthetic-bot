require('events').EventEmitter.defaultMaxListeners = 15;
const EventEmitter = require('events');
const emitter = new EventEmitter()
emitter.setMaxListeners(50)

const Discord = require('discord.js')
const client = new Discord.Client()

const loadCommands = require('./commands/load-commands')
const { version } = require('./package.json')

// Load YAML module
const loadYAML = require('./modules/yaml.js')
const config = loadYAML('config')

// Env
require('dotenv').config();
const token = process.env.DISCORD_TOKEN

// Chalk
const chalk = require('chalk');
const infoPrefixColor = chalk.black.bgWhite
const warnPrefixColor = chalk.black.bgYellow
const errorPrefixColor = chalk.white.bgRed
const urlColor = chalk.blue.underline
const highlightColor = chalk.yellow

client.on('ready', async () => {
    // Console startup messages
    console.log(infoPrefixColor(config.ConsoleStyle.Prefix.Info), `Loged on as ` + highlightColor(`${client.user.tag}`) + ` in ` + highlightColor(`${client.guilds.cache.size}`) + ` server(s) at ` + highlightColor(`${client.readyAt}`) + `.`);
	console.log(infoPrefixColor(config.ConsoleStyle.Prefix.Info), `Bot created by ` + highlightColor(`FrenchBones`) + ` ` + urlColor(`(https://frenchbones.net)`) + `. Read the Code Of Conduct. This bot is not for reselling.`)
	console.log(infoPrefixColor(config.ConsoleStyle.Prefix.Info), `Bot version:`, highlightColor(version), `\n`)
    
    // Status - will soon switch to a database so that the bot remebers
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