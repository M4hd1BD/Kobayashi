const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  _id: String,
  logChannel: String,
  tourInfoChannel: String,
  tourPingRole: String,
  autoRole: Boolean,
  autoRoleID: String,
  linkFilter: Boolean,
  linkChannel: String,
  whiteList: Array,
});

module.exports = mongoose.model("Config", configSchema);
