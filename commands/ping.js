module.exports = {
	name: 'ping',
	description: 'Check bot status',
	execute(message, args) {
		message.channel.send(`I'm alive, I'm alive!`);
		isRunning = false;
	},
};