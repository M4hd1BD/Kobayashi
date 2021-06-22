const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  _id: Number,
  tourInfoChannel: Number,
  tourPingRole: Number,
  autoRole: Boolean,
  autoRoleID: Number,
  linkFilter: Boolean,
  linkChannel: Number,
});

module.exports = mongoose.model("Config", configSchema);
