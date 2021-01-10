const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk');
const { prefix, consoleInfoPrefix, consoleWarnPrefix, consoleErrorPrefix } = require('./config.json');
const { version } = require('./package.json');
require('dotenv').config();

const token = process.env.DISCORD_TOKEN
const owner = process.env.OWNER

const client = new Discord.Client();
client.commands = new Discord.Collection();

const info = chalk.black.bgWhite
const warn = chalk.black.bgYellow
const error = chalk.white.bgRed
const url = chalk.blue.underline
const highlight = chalk.yellow

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	if (command.guildOnly && message.channel.type === 'dm') {
		console.log(warn(consoleWarnPrefix), `${message.author} tried running ${command.name} inside DMs`);
		return message.reply(`I can\'t execute \`${command.name}\` inside DMs! `);
	}
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		console.log(warn(consoleWarnPrefix), `${message.author} didn\'t provide any agruments for ${command.name}`);

		if (command.usage) {
			reply += `\nThe proper usage for \`${command.name}\` would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error(consoleErrorPrefix), error);
		message.reply(`There was an error trying to execute \`${command.name}\`, ${message.author}!`);
	}
});

client.once('ready', () => {
    console.log(info(consoleInfoPrefix), `Loged on as ` + highlight(`${client.user.tag}`) + ` in ` + highlight(`${client.guilds.cache.size}`) + ` server(s) at ` + highlight(`${client.readyAt}`) + `.`);
	console.log(info(consoleInfoPrefix), `Bot created by ` + highlight(`FrenchBones`) + ` ` + url(`(https://frenchbones.net)`) + `. Please give credit when using my bot!`)
	console.log(info(consoleInfoPrefix), `Bot version:`, highlight(version), `\n`)
});

client.login(token);