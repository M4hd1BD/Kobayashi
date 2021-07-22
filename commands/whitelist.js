const Config = require("../dbModels/config");
module.exports = {
  name: "whitelist",
  description: "Whitelist a channel for link filter.",
  permissions: "ADMINISTRATOR",
  execute(message, args) {
    const guildID = message.guild.id;
    var whiteList = [];
    Config.findById(guildID, function (err, cfgs) {
      if (err) {
        console.log(err);
        return;
      }
      whiteList = cfgs.whiteList;
      args.forEach((element) => {
        whiteList.push(element);
      });
    }).then(() => {
      Config.findByIdAndUpdate(
        guildID,
        {
          whiteList: whiteList,
        },
        (error, config) => {
          if (error) {
            console.log(error);
            return;
          }
          message.channel.send("Added channel to whitelist");
        }
      );
    });

    isRunning = false;
  },
};
