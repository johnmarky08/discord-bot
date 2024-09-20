const knights = require("knights-canvas");
const fs = require("fs-extra");
const mainCategory = "Server Updates";

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

module.exports = function (client) {
  client.on("guildMemberAdd", (message) => {
    var channelName = "welcome";
    setup(message, channelName).then((currentChannel) =>
      welcome(message, currentChannel),
    );
  });

  client.on("guildMemberRemove", (message) => {
    var channelName = "goodbye";
    setup(message, channelName).then((currentChannel) =>
      goodbye(message, currentChannel),
    );
  });
};

async function welcome(message, currentChannel) {
  var threadName = message.guild.name;
  var participantIDs = message.guild.members.cache.size;
  var imageSrc = message.guild.iconURL({ extension: "png" });
  var userMentions = message.user.globalName;
  var userAvatar = message.user.displayAvatarURL({ extension: "png" });
  var msg = `BONJOUR!, ${userMentions}\n\t┌────── ～●～ ──────┐\n----- Welcome to ${threadName} -----\n\t└────── ～●～ ──────┘\nYou're the ${participantIDs}th member of this group, please enjoy! 🥳♥`;

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
  return currentChannel
    .send({
      content: msg,
      files: [
        {
          attachment: fs.createReadStream(
            __dirname + `/../../commands/cache/welcome.jpg`,
          ),
        },
      ],
    })
    .then(() => {
      fs.unlinkSync(__dirname + `/../../commands/cache/welcome.jpg`);
      console.cmdLoaded(`${userMentions} joins the ${threadName} server!`);
    });
}

async function goodbye(message, currentChannel) {
  var threadName = message.guild.name;
  var participantIDs = message.guild.members.cache.size;
  var imageSrc = message.guild.iconURL({ extension: "png" });
  var userMentions = message.user.globalName;
  var userAvatar = message.user.displayAvatarURL({ extension: "png" });
  var msg = `Sayōnara ${userMentions}!\n${threadName} Will Miss You.`;

  var image = await new knights.Goodbye()
    .setUsername(userMentions)
    .setGuildName(threadName)
    .setGuildIcon(imageSrc)
    .setMemberCount(participantIDs)
    .setAvatar(userAvatar)
    .setBackground(bg[Math.floor(Math.random() * bg.length)])
    .toAttachment();
  var data = image.toBuffer();
  fs.writeFileSync(__dirname + "/../../commands/cache/goodbye.jpg", data);
  return currentChannel
    .send({
      content: msg,
      files: [
        {
          attachment: fs.createReadStream(
            __dirname + `/../../commands/cache/goodbye.jpg`,
          ),
        },
      ],
    })
    .then(() => {
      fs.unlinkSync(__dirname + `/../../commands/cache/goodbye.jpg`);
      console.cmdLoaded(`${userMentions} leaves the ${threadName} server!`);
    });
}

async function setup(message, channelName) {
  var currentChannel = await message.guild.channels.cache.find(
    (chanl) => chanl.name === channelName,
  );
  var category = await message.guild.channels.cache.find(
    (c) => c.name == mainCategory,
  );
  if (!category) {
    message.guild.channels
      .create({
        name: mainCategory,
        type: global.Category,
        permissionOverwrites: [
          {
            id: message.guild.id,
            allow: [global.ViewChannel],
            deny: [global.SendMessages],
          },
        ],
      })
      .then((categ) => (category = categ));
  }
  if (!currentChannel) {
    message.guild.channels
      .create({
        name: channelName,
        type: global.GuildText,
        permissionOverwrites: [
          {
            id: message.guild.id,
            allow: [global.ViewChannel],
            deny: [global.SendMessages],
          },
        ],
      })
      .then((chl) => {
        currentChannel = chl;
      });
  }
  if (currentChannel.parentID !== category.id)
    currentChannel.setParent(category.id);
  return currentChannel;
}
