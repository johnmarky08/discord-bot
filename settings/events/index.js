"use strict";

exports.langText = function (...args) {
  try {
    //CREDITS TO MIRAI FOR THIS
    const lang = require(`./../lang.json`);
    let result = lang[global.config.lang][args[0]][args[1]];
    for (var i = args.length - 1; i > 0; i--) {
      const regEx = RegExp(`%${i - 1}`, "g");
      result = result.replace(regEx, args[i + 1]);
    }
    return result;
  } catch (e) {
    console.error(e);
  }
};
