const Config = require("../dbModels/config");
module.exports = {
  name: "setup",
  description: "Setup the bot",
  execute(message, args) {
    const guildID = message.guild.id;
    var dataToEnter = {
      tourInfoChannel: 0,
      tourPingRole: 0,
      autoRole: false,
      autoRoleID: 0,
      linkFilter: false,
      linkChannel: 0,
    };
    const saveData = (data) => {
      Config.create(
        {
          _id: guildID,
          tourInfoChannel: data.tourInfoChannel,
          tourPingRole: data.tourPingRole,
          autoRole: data.autoRole,
          autoRoleID: data.autoRoleID,
          linkFilter: data.linkFilter,
          linkChannel: data.linkChannel,
        },
        (error, config) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log(config);
          return;
        }
      );
    };
    message.channel
      .send(
        "Please enter the channelID where I should send tournament informations: "
      )
      .then(() => {
        const filter = (m) => message.author.id === m.author.id;
        message.channel
          .awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
          .then((msg) => {
            dataToEnter.tourInfoChannel = msg.first().content;
            message.channel
              .send(
                "Enter the role ID of whom I should ping when posting tournament informations: "
              )
              .then(() => {
                const filter = (m) => message.author.id === m.author.id;
                message.channel
                  .awaitMessages(filter, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                  })
                  .then((msg) => {
                    dataToEnter.tourPingRole = msg.first().content;
                    message.channel
                      .send(
                        "Should I automatically add a role to a new user (true/false): "
                      )
                      .then(() => {
                        const filter = (m) => message.author.id === m.author.id;
                        message.channel
                          .awaitMessages(filter, {
                            max: 1,
                            time: 30000,
                            errors: ["time"],
                          })
                          .then((msg) => {
                            dataToEnter.autoRole = msg.first().content;
                            message.channel
                              .send(
                                "Enter the role ID that I should assign to a new user (enter N/A if you don't want it): "
                              )
                              .then(() => {
                                const filter = (m) =>
                                  message.author.id === m.author.id;
                                message.channel
                                  .awaitMessages(filter, {
                                    max: 1,
                                    time: 30000,
                                    errors: ["time"],
                                  })
                                  .then((msg) => {
                                    dataToEnter.autoRoleID =
                                      msg.first().content;
                                    message.channel
                                      .send(
                                        "Should I filter links (true/false): "
                                      )
                                      .then(() => {
                                        const filter = (m) =>
                                          message.author.id === m.author.id;
                                        message.channel
                                          .awaitMessages(filter, {
                                            max: 1,
                                            time: 30000,
                                            errors: ["time"],
                                          })
                                          .then((msg) => {
                                            dataToEnter.linkFilter =
                                              msg.first().content;
                                            message.channel
                                              .send(
                                                "Enter the channel ID where I should instruct users to post links (enter N/A if you don't want it): "
                                              )
                                              .then(() => {
                                                const filter = (m) =>
                                                  message.author.id ===
                                                  m.author.id;
                                                message.channel
                                                  .awaitMessages(filter, {
                                                    max: 1,
                                                    time: 30000,
                                                    errors: ["time"],
                                                  })
                                                  .then((msg) => {
                                                    dataToEnter.linkChannel =
                                                      msg.first().content;
                                                    message.channel.send(
                                                      "Saving now..."
                                                    );
                                                    saveData(dataToEnter);
                                                    return;
                                                  })
                                                  .catch((err) => {
                                                    message.channel.send(
                                                      "Timed out! 1"
                                                    );
                                                    console.log(err);
                                                  });
                                              });
                                          })
                                          .catch((err) => {
                                            message.channel.send(
                                              "Timed out! 2"
                                            );
                                          });
                                      });
                                  })
                                  .catch((err) => {
                                    message.channel.send("Timed out! 3");
                                  });
                              });
                          })
                          .catch((err) => {
                            message.channel.send("Timed out! 4");
                          });
                      });
                  })
                  .catch((err) => {
                    message.channel.send("Timed out! 5");
                  });
              });
          })
          .catch((err) => {
            message.channel.send("Timed out! 6");
          });
      });

    isRunning = false;
  },
};
