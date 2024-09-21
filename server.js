//IMPORTS
const express = require("express");
const Discord = require("discord.js");
const fs = require("fs-extra");
const path = require("path");
const log = require("./settings/log.js");
const messageLog = require("./settings/messageLog.js");
const update = require("./settings/events/update.js");
const lang = require("./settings/lang.json");
const config = require("./config.json");

//GLOBALS AND CONSTANTS
const Client = Discord.Client;
const commands = {};
global.config = config;
global.PREFIX = global.config.PREFIX;
global.GuildText = Discord.ChannelType.GuildText;
global.Category = Discord.ChannelType.GuildCategory;
global.ViewChannel = Discord.PermissionFlagsBits.ViewChannel;
global.SendMessages = Discord.PermissionFlagsBits.SendMessages;
global.lang = lang[global.config.lang];

//LOGS
console.loaded = log.loaded;
console.logg = log.log;
console.error = log.err;
console.cmdLoaded = log.cmdloaded;
console.message = log.message;

//PING
console.logg("Kiro Bot is Starting!");

const app = express();
const port = process.env.PORT || process.env.port || 8080;
app.listen(port, function (err) {
  if (err) {
    console.error("Failure To Launch Server");
    return;
  }
  console.logg(`Listening On Port: ${port}`);
});
app.get("/", function (req, res) {
  res.redirect("https://muichiro-api.onrender.com/");
});
app.use("/ping", (req, res) => {
  res.send(new Date());
});

//LOAD COMMANDS
var filteredFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.indexOf(".") !== 0 && file.slice(-3) === ".js");
filteredFiles.map((file) => {
  fileName = require(path.join(__dirname, "commands", file));
  commands[file.slice(0, -3)] = fileName;
  console.cmdLoaded(
    "Command " +
      fileName.commandName +
      " Successfully Loaded → Version: " +
      fileName.version,
  );
});

console.logg(`Successfully Loaded: ${filteredFiles.length} Commands`);
console.logg("Successfully Connected On Muichiro Senpai's Server\n");

//BOT
const client = new Client({ intents: 131071 });
client.on("ready", () => {
  console.logg(`Logged in as ${client.user.tag}!`);
  console.logg(
    `${client.guilds.cache.size} Server/s, ${client.users.cache.size} Member/s, ${client.channels.cache.size} Channel/s`,
  );
  client.user.setActivity(`[ ${global.PREFIX} ] ${global.config.BOTNAME}`, {
    type: "WATCHING",
  });
});
client.on("guildCreate", async (guild) => {
  await guild.channels.fetch();
  update
    .setup(guild, global.config.main_channels)
    .then((annChannel) =>
      annChannel.send(global.config.BOTNAME + " Bot is Connected!"),
    )
    .catch((e) => console.error(e.toString()));
  guild.members.cache
    .find((x) => x.user.tag == client.user.tag)
    .setNickname("[ " + global.config.PREFIX + " ] " + global.config.BOTNAME);
  console.cmdLoaded(
    global.config.BOTNAME + " Bot is added to Server: " + guild.name,
  );
});
client.on("guildDelete", (guild) => {
  console.cmdLoaded(
    global.config.BOTNAME + " Bot has left the Server: " + guild.name,
  );
});

//EXECUTE COMMANDS
client.on("messageCreate", (message) => {
  if (!message.channel.guild || message.author.bot) return;
  messageLog(message);
  if (message.content.startsWith(`${global.PREFIX}`)) {
    if (message.content.slice(1).split(" ")[0] in commands) {
      try {
        var command = commands[message.content.slice(1).split(" ")[0]];
        var args = message.content.split(" ").splice(1).join(" ") ?? "";
        command.execute(message, args);
      } catch (error) {
        console.log("Error: " + error);
      }
    } else return message.channel.send(global.lang.settings.wrongCommand.replace("%0", global.config.PREFIX));
  }
});

update(client);

client.login(process.env["token"]);
