const commandName = "announce";
const version = "1.0.0";
const permission = 1;
const description = "Announce Messages in the Announcement Channel";
const author = "John Marky Dev";

async function execute(message, args) {
  if (!args) return message.reply(global.langText("commands", "noText"));
  const annChannel = message.guild.channels.cache.find(
    (chanl) => chanl.name === global.config.main_channels[2],
  );
  return annChannel.send(`${args}\n\n@everyone`);
}

module.exports = {
  commandName,
  version,
  permission,
  description,
  author,
  execute,
};
