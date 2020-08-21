module.exports = {
	name: 'clear',
	description: 'Delete multiple messages.',
    args: true,
    usage: '<number (1-99)>',
    guildOnly: true,
    execute(message, args) {
		const amount = parseInt(args[0]);
    
        if (isNaN(amount)) {
            return message.reply('That doesn\'t seem to be a valid number, ${message.author}.');
        } else if (amount < 1 || amount > 99) {
            return message.reply('You need to input a number between 1 and 99, ${message.author}.');
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('There was an error trying to clean messages in this channel, ${message.author}!');
        });
	},
};