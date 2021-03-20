const { prefix } = require('./config.json');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config()

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
global.isRunning = false;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.once('ready', () => {
    client.user.setPresence({ activity: { type: 'PLAYING', name: 'with YOU' }, status: 'online' });
	console.log('Ready!');
});

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) {
        message.channel.send(`It doesn't seem to be something I'm familiar with!`);
        return;
    }

    const command = client.commands.get(commandName);

    if(isRunning) {
        return message.reply("There already a command running, please wait for it to get done. This might be used as a input for that running command");
    }

    if(command.permissions) {
        const authorPerm = message.channel.permissionsFor(message.author);

        if(!authorPerm || !authorPerm.has(command.permissions)) {
            return message.reply("You're not allowed to do this");
        }
    }

    try {
        isRunning = true;
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});

client.login(process.env.botToken);
