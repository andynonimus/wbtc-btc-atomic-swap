const { createHTLCBTC } = require('../helpers');

module.exports = () => {
  return async ctx => {
    const { replyWithMarkdown, state } = ctx;
    const { args } = state.command;

    const result = createHTLCBTC(args[0], args[1], args[2], args[3], ctx);    

    replyWithMarkdown(`*${result}*`);
  };
};
