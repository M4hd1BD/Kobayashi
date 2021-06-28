const { prefix } = require("./config.json");
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
global.isRunning = false;
global.linkProtection = false;

let mongoConfig = process.env.mainDB;
if (mongoConfig == null || mongoConfig == "") {
  mongoConfig = "mongodb://localhost/disBot";
}
mongoose.connect(mongoConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("DB looks OK!");
});

const Config = require("./dbModels/config");

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  client.user.setPresence({
    activity: { type: "PLAYING", name: "with YOU" },
    status: "online",
  });
  console.log("Ready!");
});
let configs = {};
client.on("message", (message) => {
  const guildID = message.guild.id;
  const setConfigs = (data) => {
    configs.tourInfoChannel = data.tourInfoChannel;
    configs.tourPingRole = data.tourPingRole;
    configs.linkFilter = data.linkFilter;
    configs.linkChannel = data.linkChannel;
  };
  Config.findById(guildID, function (err, cfgs) {
    if (err) {
      console.log(err);
      return;
    }
    if (cfgs !== null) {
      setConfigs(cfgs);
    }
  })
    .then(() => {
      if (configs.linkFilter) {
        const linkRegEx = new RegExp(
          "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
        );
        if (
          message.content.match(linkRegEx) !== null &&
          message.channel.id !== configs.linkChannel
        ) {
          if (message.member.hasPermission("ADMINISTRATOR")) {
            return;
          } else if (message.channel.id === "810795631882272799") {
            return;
          }
          const logChannel = client.channels.cache.get("821275110459047937");
          const logMessage = `${message.author}'s messsage has been deleted because it failed to pass the link filter. The message they sent was: '${message.content}'`;
          logChannel.send(logMessage);
          message
            .delete()
            .then(() =>
              message.channel.send(
                `${message.author}, Links aren't allowed here, send them to <#${configs.linkChannel}>`
              )
            );
          return;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });

  if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    message.channel.type == "dm"
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) {
    message.channel.send(`It doesn't seem to be something I'm familiar with!`);
    return;
  }

  const command = client.commands.get(commandName);

  if (isRunning) {
    return message.reply(
      "There already a command running, please wait for it to get done. This might be used as a input for that running command"
    );
  }

  if (command.permissions) {
    const authorPerm = message.channel.permissionsFor(message.author);

    if (!authorPerm || !authorPerm.has(command.permissions)) {
      return message.reply("You're not allowed to do this");
    }
  }

  try {
    isRunning = true;
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.on("guildMemberAdd", (member) => {
  const guildID = member.guild.id;
  const setConfigs = (data) => {
    configs.autoRole = data.autoRole;
    configs.autoRoleID = data.autoRoleID;
  };
  Config.findById(guildID, function (err, cfgs) {
    if (err) {
      console.log(err);
      return;
    }
    if (cfgs !== null) {
      setConfigs(cfgs);
    }
  })
    .then(() => {
      if (configs.autoRole) {
        const guild = client.guilds.cache.get(guildID);
        const role = guild.roles.cache.find(
          (role) => role.id === configs.autoRoleID
        );
        member.roles.add(role);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

client
  .login(process.env.botToken)
  .then(() => {
    console.log("We're in!");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
