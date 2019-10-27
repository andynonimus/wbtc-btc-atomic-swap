const { getPubKeyHashBTC } = require('../helpers');

module.exports = () => {
  return async ctx => {
    const { replyWithMarkdown, state } = ctx;
    const { args } = state.command;

    const result = getPubKeyHashBTC(args[0]);

    replyWithMarkdown(`*${result}*`);
  };
};
