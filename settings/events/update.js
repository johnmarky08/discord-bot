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

module.exports = function (client) {
  client.on("guildMemberAdd", (message) => {
    if (message.user.bot) return;
    const channelName = global.config.main_channels[0];
    const currentChannel = message.guild.channels.cache.find(
      (chanl) => chanl.name === channelName,
    );
    welcome(message, currentChannel, client);
  });

  client.on("guildMemberRemove", (message) => {
    if (message.user.bot) return;
    const channelName = global.config.main_channels[1];
    const currentChannel = message.guild.channels.cache.find(
      (chanl) => chanl.name === channelName,
    );
    goodbye(message, currentChannel, client);
  });
};

module.exports.setup = async function (guild, channelNames) {
  let category = await guild.channels.cache.find(
      (c) => c.name == global.config.main_category,
    ),
    welcomeChannel = await guild.channels.cache.find(
      (c) => c.name == global.config.main_channels[0],
    ),
    goodbyeChannel = await guild.channels.cache.find(
      (c) => c.name == global.config.main_channels[1],
    ),
    annChannel = await guild.channels.cache.find(
      (c) => c.name == global.config.main_channels[2],
    );
  if (category || welcomeChannel || goodbyeChannel || annChannel)
    return annChannel;
  else {
    await guild.channels
      .create({
        name: global.config.main_category,
        type: global.Category,
        permissionOverwrites: [
          {
            id: guild.id,
            allow: [global.ViewChannel],
            deny: [global.SendMessages],
          },
        ],
      })
      .then((categ) => (category = categ))
      .catch((e) => console.error(e.toString()));
    for (cN of channelNames) {
      await guild.channels
        .create({
          name: cN,
          type: global.GuildText,
          parent: category,
          permissionOverwrites: [
            {
              id: guild.id,
              allow: [global.ViewChannel],
              deny: [global.SendMessages],
            },
          ],
        })
        .then((chl) => {
          if (cN === "announcements") annChannel = chl;
        })
        .catch((e) => console.error(e.toString()));
    }
  }
  return annChannel;
};

async function welcome(message, currentChannel, client) {
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
  const textChannel = await client.channels.fetch(currentChannel.id);
  textChannel
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
    })
    .catch((err) => console.error(err.toString()));
}

async function goodbye(message, currentChannel, client) {
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
  const textChannel = await client.channels.fetch(currentChannel.id);
  textChannel
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
    })
    .catch((err) => console.error(err.toString()));
}
