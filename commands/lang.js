const commandName = "lang";
const version = "1.0.0";
const permission = 1;
const description = "Change System's Language";
const author = "John Marky Dev";

function execute(message, args) {
  const path = require("path"),
    fs = require("fs-extra"),
    langPath = path.join(__dirname, "..", "config.json"),
    language = require(__dirname + "/../settings/lang.json");
  let lang = require(langPath);
  let _lang = global.config.lang;
  if (!args) {
    if (_lang === "en") {
      lang.lang = "tl";
      fs.writeFileSync(langPath, JSON.stringify(lang, null, 2), "utf-8");
      return message.reply(
        "Language Has Been Successfully Changed Into Tagalog (tl)",
      );
    } else {
      lang.lang = "en";
      fs.writeFileSync(langPath, JSON.stringify(lang, null, 2), "utf-8");
      return message.reply(
        "Language Has Been Successfully Changed Into English (en)",
      );
    }
  } else {
    if (language[args]) {
      lang.lang = args;
      fs.writeFileSync(langPath, JSON.stringify(lang, null, 2), "utf-8");
      return message.reply(
        "Language Has Been Successfully Changed Into " + args.toUpperCase(),
      );
    } else {
      return message.reply(
        "The Language You Just Entered Is Not Available!",
      );
    }
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
