const knights = require("knights-canvas");
const fs = require("fs-extra");

const bg = [
  "https://i.imgur.com/rLAPa7R.jpg",
  "https://i.imgur.com/rmhY9ag.jpg",
  "https://i.imgur.com/YltIZ2D.jpg",
  "https://i.imgur.com/BAzCvkg.jpg",
  "https://i.imgur.com/ue9jObV.jpg",
  "https://i.imgur.com/Wplfnwm.jpg",
  "https://i.imgur.com/vcVoJFF.jpg",
  "https://i.imgur.com/fsbXW9z.jpg",
  "https://i.imgur.com/qschtOP.jpg",
  "https://i.imgur.com/gCXGiOg.jpg",
  "https://i.imgur.com/xY1d1Cz.jpg",
];

module.exports = function (client, PermissionFlagsBits) {
  var channelName = "welcome";

  client.on("guildMemberAdd", (message) => {
    var currentChannel = message.guild.channels.cache.find(
      (chanl) => chanl.name === channelName,
    );
    if (
      !message.guild.channels.cache.find(
        (cHannel) => cHannel.name === channelName,
      )
    ) {
      message.guild.channels
        .create({
          name: channelName,
          type: global.GuildText,
          permissionOverwrites: [
            {
              id: message.guild.id,
              allow: [PermissionFlagsBits.ViewChannel],
            },
          ],
        })
        .then((chl) => (currentChannel = chl));
    }
    welcome(message, currentChannel);
  });
};

async function welcome(message, currentChannel) {
  var threadName = message.guild.name;
  var participantIDs = message.guild.members.cache.length;
  var imageSrc = message.guild.iconURL({ extension: "png" });
  var userMentions = message.user.globalName;
  var userAvatar = message.user.displayAvatarURL({ extension: "png" });
  var msg = `BONJOUR!, ${userMentions}\n┌────── ～●～ ──────┐\n----- Welcome to ${threadName} -----\n└────── ～●～ ──────┘\nYou're the ${participantIDs}th member of this group, please enjoy! 🥳♥`;

  var image = await new knights.Welcome()
    .setUsername(userMentions)
    .setGuildName(threadName)
    .setGuildIcon(imageSrc)
    .setMemberCount(participantIDs)
    .setAvatar(userAvatar)
    .setBackground(bg[Math.floor(Math.random() * bg.length)])
    .toAttachment();
  var data = image.toBuffer();
  fs.writeFileSync(__dirname + "/../../commands/cache/welcome.jpg", data);
  return currentChannel.send(
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
