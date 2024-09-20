const commandName = "test";
const version = "1.0.0";
const description = "Test Command";
const credit = "John Marky Dev";

function execute(message, args) {
  message.channel.send(`${commandName} command executed!\n\n${args}`);
}

module.exports = {
  commandName,
  version,
  description,
  credit,
  execute
}