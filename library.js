var emoji = require('./emoji.json');

exports.defineEmoji = function (data, callback) {
  emoji.path = __dirname;
  data.packs.push(emoji);
  callback(null, data);
};
