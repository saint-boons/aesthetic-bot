module.exports = {
	name: 'gay',
	description: 'gay.',
	args: true,
    usage: '<target user>',
    guildOnly: true,
	execute(message, args) {
		if (!message.mentions.users.size) {
            return message.reply('you need to tag a gay user!');
        }

        const taggedUser = message.mentions.users.first();
        message.channel.send(`${taggedUser.username} is gay`);
	},
};