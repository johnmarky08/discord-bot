const commandName = "changenn";
const version = "1.5.9";
const permission = 0;
const description = "Change Your/Someone's Nickname";
const author = "John Marky Dev";

function execute(message, args) {
  if (!args) {
    message.member.setNickname(message.member.user.globalName);
    return message.reply(
      `Cleared ${message.member.user.globalName}'s Nickname.`,
    );
  } else if (args.includes(" | ")) {
    const [user, nickName] = args.split(" | ");
    const member = message.guild.members.cache.find(x=> x.user.globalName == user);
    if (!member) return message.reply("Invalid Username! Use their default name! (Case Sensitive)");
    else if (nickName == "RESET") {
      member.setNickname(member.user.globalName);
      return message.reply(
        `Cleared ${member.user.globalName}'s nickname.`,
      );
    } else {
      member.setNickname(nickName);
      return message.reply(
        `Changed ${member.user.globalName}'s nickname to ${nickName}.`,
      );
    }
  }
  message.member.setNickname(args);
  return message.reply(
    `Changed ${message.member.user.globalName}'s nickname to ${args}.`,
  );
}

module.exports = {
  commandName,
  version,
  permission,
  description,
  author,
  execute,
};
