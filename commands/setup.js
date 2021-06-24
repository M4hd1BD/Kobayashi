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
                                                dataToEnter.linkFilter == "no"
                                              ) {
                                                dataToEnter.linkFilter = false;
                                                saveData(dataToEnter);
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
                            } else if (dataToEnter.autoRole == "no") {
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
                                        dataToEnter.linkFilter == "no"
                                      ) {
                                        dataToEnter.linkFilter = false;
                                        saveData(dataToEnter);
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
    isRunning = false;
  },
};
