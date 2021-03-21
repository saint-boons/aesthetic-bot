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

const infoPrefix = chalk.black.bgWhite
const warnPrefix = chalk.black.bgYellow
const errorPrefix = chalk.white.bgRed
const url = chalk.blue.underline
const highlight = chalk.yellow

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	if (command.guildOnly && message.channel.type === 'dm') {
		console.log(warnPrefix(consoleWarnPrefix), `${message.author} tried running ${command.name} inside DMs`);
		return message.reply(`I can\'t execute \`${command.name}\` inside DMs! `);
	}

//	Future permission system (role, role ID, node)
//	if (command.permissions) {
//		const authorPerms = message.channel.permissionsFor(message.author);
//		if (!authorPerms || !authorPerms.has(command.permissions)) {
//			return message.reply('You can not do this!');
//		}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		console.log(warnPrefix(consoleWarnPrefix), `${message.author} didn\'t provide any agruments for ${command.name}`);

		if (command.usage) {
			reply += `\nThe proper usage for \`${command.name}\` would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args); 
	} catch (error) {
		console.log(errorPrefix(consoleErrorPrefix), error);
		message.reply(`There was an error trying to execute \`${command.name}\`, ${message.author}!`);
	}
});

client.once('ready', () => {
    console.log(infoPrefix(consoleInfoPrefix), `Loged on as ` + highlight(`${client.user.tag}`) + ` in ` + highlight(`${client.guilds.cache.size}`) + ` server(s) at ` + highlight(`${client.readyAt}`) + `.`);
	console.log(infoPrefix(consoleInfoPrefix), `Bot created by ` + highlight(`FrenchBones`) + ` ` + url(`(https://frenchbones.net)`) + `. Please give credit when using my bot!`)
	console.log(infoPrefix(consoleInfoPrefix), `Bot version:`, highlight(version), `\n`)
});

client.login(token);