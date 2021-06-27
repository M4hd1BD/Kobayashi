const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  _id: String,
  tourInfoChannel: String,
  tourPingRole: String,
  autoRole: Boolean,
  autoRoleID: String,
  linkFilter: Boolean,
  linkChannel: String,
});

module.exports = mongoose.model("Config", configSchema);
