require('events').EventEmitter.defaultMaxListeners = 50;

// Path aliases
require('module-alias/register')

// New client
const Discord = require('discord.js')
const client = new Discord.Client()

// Load commands and get version
const loadYAML = require('@modules/yaml.js')
const config = loadYAML('config')
const loadCommands = require('@root/commands/load-commands')
const loadFeatures = require('@root/features/load-features')
const { version } = require('@root/package.json')

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

    loadCommands(client)
    loadFeatures(client)
})

// Bot login
client.login(token);