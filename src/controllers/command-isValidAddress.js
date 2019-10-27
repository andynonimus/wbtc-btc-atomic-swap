const { isValidAddress } = require('../helpers');

module.exports = () => {
  return async ctx => {
    const { reply, replyWithMarkdown, state, web3 } = ctx;
    const { args } = state.command;

    if (args.length < 2) {
      reply(`ERROR: Invalid number of arguments. ${args.length} of required 2 provided.`);
      return;
    }

    const result = isValidAddress(args[0], args[1], web3);

    replyWithMarkdown(`${args[0].toUpperCase()} address provided is *${result ? 'VALID' : 'INVALID'}!*`);
  };
};
