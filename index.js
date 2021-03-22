const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const path = require('path')

const config = require('./config.json')
const command = require('./command')
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

    //Command handler
    const baseFile = 'command-handler.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    readCommands('commands')
})

// Bot login
client.login(token);