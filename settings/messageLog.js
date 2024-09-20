module.exports = function (message) {
  const moment = require("moment-timezone");
  const chalk = require("chalk");
  var time = moment.tz("Asia/Manila").format("LLLL");
  var colors = [
    "FF9900",
    "FFFF33",
    "33FFFF",
    "FF99FF",
    "FF3366",
    "FFFF66",
    "FF00FF",
    "66FF99",
    "00CCFF",
    "FF0099",
    "FF0066",
  ];
  var random = colors[Math.floor(Math.random() * colors.length)];
  var random1 = colors[Math.floor(Math.random() * colors.length)];
  var random2 = colors[Math.floor(Math.random() * colors.length)];
  var random3 = colors[Math.floor(Math.random() * colors.length)];
  var nameUser = message.member.user.globalName;
  var msg = message.content;
  var serverName = message.guild.name;
  var channelName = message.channel.name;
  

  console.message(
    chalk.hex("#" + random)(`${serverName} | ${channelName}`) +
      chalk.hex("#" + random1)(`\nSender Name: ${nameUser}`) +
      chalk.hex("#" + random2)(`\nContent: ${msg}`) +
      `\n\n` +
      chalk.hex("#" + random3)(`[ ${time} ]`) +
      `\n` +
      chalk.white(`◆━━━━━━━━━━◆━━━━━━━━━◆━━━━━━━━◆`),
  );
};
