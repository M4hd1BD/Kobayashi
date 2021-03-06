const Config = require("../dbModels/config");
module.exports = {
  name: "setup",
  description: "Setup the bot",
  permissions: "ADMINISTRATOR",
  execute(message, args) {
    const guildID = message.guild.id;
    var dataToEnter = {
      tourInfoChannel: "",
      tourPingRole: "",
      autoRole: false,
      autoRoleID: "",
      linkFilter: false,
      linkChannel: "",
      logChannel: "",
    };
    const insertData = (data) => {
      message.guild.channels
        .create("kobayashi-log", {
          type: "text",
          permissionOverwrites: [
            {
              id: message.guild.roles.everyone.id,
              deny: ["VIEW_CHANNEL"],
            },
          ],
        })
        .then((channel) => {
          console.log(channel.id);
          data.logChannel = channel.id;
        })
        .then(() => {
          Config.create(
            {
              _id: guildID,
              tourInfoChannel: data.tourInfoChannel,
              tourPingRole: data.tourPingRole,
              autoRole: data.autoRole,
              autoRoleID: data.autoRoleID,
              linkFilter: data.linkFilter,
              linkChannel: data.linkChannel,
              logChannel: data.logChannel,
            },
            (error, config) => {
              if (error) {
                console.log(error);
                return;
              }
              message.channel.send("Saved Configuration!");
              return;
            }
          );
        });
    };

    const updateData = (data) => {
      Config.findByIdAndUpdate(
        guildID,
        {
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
          message.channel.send("Updated Configuration!");
        }
      );
    };
    const saveData = (data) => {
      Config.findById(guildID, function (err, guild) {
        if (err) {
          console.log(err);
          return;
        }
        if (guild !== null) {
          updateData(data);
        } else if (guild == null) {
          insertData(data);
        }
      });
    };

    message.channel
      .send(
        "Enter the channel ID you want your tournament info to be posted on: "
      )
      .then(() => {
        const filter = (m) => message.author.id === m.author.id;
        message.channel
          .awaitMessages(filter, {
            time: 60000,
            max: 1,
            errors: ["time"],
          })
          .then((messages) => {
            dataToEnter.tourInfoChannel = messages.first().content;
            message.channel
              .send(
                "Enter the role ID you want to ping when posting tournament info: "
              )
              .then(() => {
                const filter = (m) => message.author.id === m.author.id;
                message.channel
                  .awaitMessages(filter, {
                    time: 60000,
                    max: 1,
                    errors: ["time"],
                  })
                  .then((messages) => {
                    dataToEnter.tourPingRole = messages.first().content;
                    message.channel
                      .send(
                        "Do you want to automatically assign a role to new user (Yes/No): "
                      )
                      .then(() => {
                        const filter = (m) => message.author.id === m.author.id;
                        message.channel
                          .awaitMessages(filter, {
                            time: 60000,
                            max: 1,
                            errors: ["time"],
                          })
                          .then((messages) => {
                            dataToEnter.autoRole = messages
                              .first()
                              .content.toLowerCase();
                            if (dataToEnter.autoRole == "yes") {
                              dataToEnter.autoRole = true;
                              message.channel
                                .send(
                                  "Enter the role ID you want to automatically assign to new users: "
                                )
                                .then(() => {
                                  const filter = (m) =>
                                    message.author.id === m.author.id;
                                  message.channel
                                    .awaitMessages(filter, {
                                      time: 60000,
                                      max: 1,
                                      errors: ["time"],
                                    })
                                    .then((messages) => {
                                      dataToEnter.autoRoleID =
                                        messages.first().content;
                                      message.channel
                                        .send(
                                          "Do you want to filter links (Yes/No): "
                                        )
                                        .then(() => {
                                          const filter = (m) =>
                                            message.author.id === m.author.id;
                                          message.channel
                                            .awaitMessages(filter, {
                                              time: 60000,
                                              max: 1,
                                              errors: ["time"],
                                            })
                                            .then((messages) => {
                                              dataToEnter.linkFilter = messages
                                                .first()
                                                .content.toLowerCase();
                                              if (
                                                dataToEnter.linkFilter == "yes"
                                              ) {
                                                dataToEnter.linkFilter = true;
                                                message.channel
                                                  .send(
                                                    "Enter the channel you want to instruct the users to send links: "
                                                  )
                                                  .then(() => {
                                                    const filter = (m) =>
                                                      message.author.id ===
                                                      m.author.id;
                                                    message.channel
                                                      .awaitMessages(filter, {
                                                        time: 60000,
                                                        max: 1,
                                                        errors: ["time"],
                                                      })
                                                      .then((messages) => {
                                                        dataToEnter.linkChannel =
                                                          messages.first().content;
                                                        saveData(dataToEnter);
                                                        isRunning = false;
                                                        //console.log(dataToEnter);
                                                      })
                                                      .catch(() => {
                                                        message.channel.send(
                                                          "You did not enter any input! 1"
                                                        );
                                                      });
                                                  })
                                                  .catch(() => {
                                                    message.channel.send(
                                                      "You did not enter any input! 2"
                                                    );
                                                  });
                                              } else if (
                                                dataToEnter.linkFilter !== "yes"
                                              ) {
                                                dataToEnter.linkFilter = false;
                                                saveData(dataToEnter);
                                                isRunning = false;
                                                //console.log(dataToEnter);
                                              }
                                            })
                                            .catch(() => {
                                              message.channle.send(
                                                "You did not enter any input! 3"
                                              );
                                            });
                                        })
                                        .catch(() => {
                                          message.channel.send(
                                            "You did not enter any input! 4"
                                          );
                                        });
                                    })
                                    .catch(() => {
                                      message.channel.send(
                                        "You did not enter any input! 5"
                                      );
                                    });
                                })
                                .catch(() => {
                                  message.channel.send(
                                    "You did not enter any input! 6"
                                  );
                                });
                            } else if (dataToEnter.autoRole !== "yes") {
                              dataToEnter.autoRole = false;
                              message.channel
                                .send("Do you want to filter links (Yes/No): ")
                                .then(() => {
                                  const filter = (m) =>
                                    message.author.id === m.author.id;
                                  message.channel
                                    .awaitMessages(filter, {
                                      time: 60000,
                                      max: 1,
                                      errors: ["time"],
                                    })
                                    .then((messages) => {
                                      dataToEnter.linkFilter = messages
                                        .first()
                                        .content.toLowerCase();
                                      if (dataToEnter.linkFilter == "yes") {
                                        dataToEnter.linkFilter = true;
                                        message.channel
                                          .send(
                                            "Enter the channel ID you want to instruct the users to send links to: "
                                          )
                                          .then(() => {
                                            const filter = (m) =>
                                              message.author.id === m.author.id;
                                            message.channel
                                              .awaitMessages(filter, {
                                                time: 60000,
                                                max: 1,
                                                errors: ["time"],
                                              })
                                              .then((messages) => {
                                                dataToEnter.linkChannel =
                                                  messages.first().content;
                                                saveData(dataToEnter);
                                                isRunning = false;
                                                //console.log(dataToEnter);
                                              })
                                              .catch(() => {
                                                message.channel.send(
                                                  "You did not enter any input! -4"
                                                );
                                              });
                                          })
                                          .catch(() => {
                                            message.channel.send(
                                              "You did not enter any input! -3"
                                            );
                                          });
                                      } else if (
                                        dataToEnter.linkFilter !== "yes"
                                      ) {
                                        dataToEnter.linkFilter = false;
                                        saveData(dataToEnter);
                                        isRunning = false;
                                        //console.log(dataToEnter);
                                      }
                                    })
                                    .catch(() => {
                                      message.channel.send(
                                        "You did not enter any input! -2"
                                      );
                                    });
                                })
                                .catch(() => {
                                  message.channel.send(
                                    "You did not enter any input! -1"
                                  );
                                });
                            }
                          })
                          .catch(() => {
                            message.channel.send(
                              "You did not enter any input! 0"
                            );
                          });
                      })
                      .catch(() => {
                        message.channel.send("You did not enter any input! 7");
                      });
                  })
                  .catch(() => {
                    message.channel.send("You did not enter any input! 7");
                  });
              })
              .catch(() => {
                message.channel.send("You did not enter any input! 8");
              });
          })
          .catch(() => {
            message.channel.send("You did not enter any input! 9");
          });
      });
  },
};
