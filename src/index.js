const Extra = require('telegraf/extra');
const logger = require('./logger');
const app = require('./app');

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

app.catch(err => {
  logger.error(err);
});

app.help(ctx => {
  ctx.replyWithMarkdown(
    `I help you do WBTC <> BTC atomic swaps.
You can control me by sending these commands:

*Atomic Swap*
/start - Start the atomic swap wizard.

*Commands*
/getLiquidityBTC - Get the available BTC liquidity on Bitcoin chain.
/getPubKeyHashBTC - Get the public key hash of a Bitcoin address.
/getLiquidityETH - Get the available WBTC liquidity on Ethereum chain.
/isValidAddress - Check if the address inputted is a valid BTC or ETH address.

*Help*
/help - Display this help message.
/faq - Display frequently asked questions and atomic swap flow.`,

    Extra.inReplyTo(ctx.message.message_id),
  );
});

app.startPolling();

logger.info('- TELEGRAM BOT STARTED -');
