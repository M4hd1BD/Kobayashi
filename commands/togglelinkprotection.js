module.exports = {
  name: "togglelinkprotection",
  description: "Turn on or off Link Protection",
  permissions: "ADMINISTRATOR",
  execute(message, args) {
    if (linkProtection) {
      linkProtection = false;
      message.channel.send("Link protection turned off.");
      isRunning = false;
    } else if (!linkProtection) {
      linkProtection = true;
      message.channel.send("Link protection turned on.");
      isRunning = false;
    }
  },
};
