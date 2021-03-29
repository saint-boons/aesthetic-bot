const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const config = require("../config.json");
const loadCommands = require("./load-commands");

module.exports = {
	commands: ["help"],
	expectedArgs: '<command> / none',
	maxArgs: 1,
	description: "Gives a list of avaliable commands and more info about them.",
	callback: (client, message, arguments, text) => {
		const title = (str) => str.replace(/\b\S/g, (t) => t.toUpperCase());
		if (!arguments[0]) {
			const helpEmbed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle("Command Help")
				.setDescription("Here are the avaliable commands.")
				.setFooter(config.embedFooterText, config.embedFooterIcon);
			const commandsFiles = fs.readdirSync(path.join(__dirname, './'));
			const folders = commandsFiles.filter(command => !command.includes('.js'));
			for (const folder of folders) {
				const commandList = fs.readdirSync(path.join(__dirname, '.', folder));
				const commandListFormat = commandList.join(', ').replace(/\.js/g, '');
				console.log(commandListFormat)
				helpEmbed.addField(title(folder), `\`\`\`${commandListFormat}\`\`\``, true)
			}
			message.channel.send(helpEmbed);
		} else {
			//
		}
	},
};
