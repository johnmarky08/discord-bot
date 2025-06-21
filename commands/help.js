const commandName = "help";
const version = "2.5.0";
const permission = 0;
const description = "Commands List and Description";
const author = "John Marky Dev";

async function execute(message, args) {
  const path = require("path");
  const axios = require("axios");
  try {
    var commandInfo = require(path.join(
      __dirname,
      "..",
      "commands",
      `${args}.js`
    ));
    if (!parseInt(args)) {
      var p = commandInfo.permission,
        _perm =
          p == 1
            ? "Admins"
            : p == 2
            ? "On Maintenance"
            : p == 3
            ? "John Marky Dev"
            : "Everyone";
      return message.reply(
        "📝 DESCRIPTION OF " +
          args.toUpperCase() +
          "\n\n» Name: " +
          commandInfo.commandName +
          "\n» Version: " +
          commandInfo.version +
          "\n» Description: " +
          commandInfo.description +
          "\n» Author: " +
          commandInfo.author +
          "\n» Has Permission: " +
          _perm
      );
    }
  } catch {
    message.reply("Please Wait... ⚙️");
    var one = 10;
    var page = parseInt(args) || 1;
    var res = await axios.get(
      process.env.API_ROOT_URL + "/facts?api_key=muichiro"
    );
    var factss = res.data.data;
    let text = "";
    var listFile = global.listOfCommands;
    for (var i = 0; i < listFile.length; i++) {
      listFile[i] = listFile[i][0].toUpperCase() + listFile[i].slice(1);
    }
    listFile.sort((a, b) => a.data - b.data);
    var tpage = Math.ceil(listFile.length / one);
    if (page > tpage) page = tpage;
    var slice = one * page - one;
    const bago = listFile.slice(slice, slice + one);
    for (let item of bago) {
      text += `〘 ${++slice} 〙 ` + global.config.PREFIX + item + "\n";
    }
    return message.reply(
      `『 LIST OF COMMANDS 』\n\n` +
        text +
        "\n[ DYK ]: " +
        factss +
        `\n\n➣ Page ` +
        page +
        "/" +
        tpage +
        `\n\nThere Are Currently A Total Of ` +
        listFile.length +
        ` Commands Available In ` +
        global.config.BOTNAME +
        ` Bot`
    );
  }
}

module.exports = {
  commandName,
  version,
  permission,
  description,
  author,
  execute,
};
