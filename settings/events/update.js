const knights = require("knights-canvas");
const fs = require("fs");

module.exports = function (client) {
  client.on("guildMemberAdd", (member) => {
    welcome(member);
  });
};

async function welcome(member) {
  var threadName = member.guild.name;
  var participantIDs = member.guild.members.cache.length;
  var imageSrc = member.guild.iconURL({ format: "png" });
  var userMentions = member.user.globalName;
  var userAvatar = member.user.displayAvatarURL({ format: "png" });
  var msg = `BONJOUR!, ${userMentions}\n┌────── ～●～ ──────┐\n----- Welcome to ${threadName} -----\n└────── ～●～ ──────┘\nYou're the ${participantIDs}th member of this group, please enjoy! 🥳♥`;

  var image = await new knights.Welcome()
    .setUsername(userMentions)
    .setGuildName(threadName)
    .setGuildIcon(imageSrc)
    .setMemberCount(participantIDs.length)
    .setAvatar(userAvatar)
    .setBackground(_data)
    .toAttachment();
  var data = image.toBuffer();
  fs.writeFileSync(__dirname + "/../../commands/cache/welcome.jpg", data);
  return message.channel.send(
    {
      content: msg,
      files: [
        {
          attachment: fs.createReadStream(
            __dirname + `/../../commands/cache/welcome.jpg`,
          ),
        },
      ],
    },
    () => fs.unlinkSync(__dirname + `/../../commands/cache/welcome.jpg`),
  );
}
