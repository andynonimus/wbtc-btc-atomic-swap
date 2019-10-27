const fs = require('fs');

module.exports = () => {
  return async ctx => {
    const { contracts, replyWithMarkdown } = ctx;
    const { WBTC } = contracts;
    
    const config = JSON.parse(
      fs.readFileSync('src/config/default.json', 'utf8')
    );

    const balance =
      (await WBTC.methods
        .balanceOf(config.contracts.WBTCAtomicSwapETH)
        .call()) /
      10 ** (await WBTC.methods.decimals().call());

    replyWithMarkdown(`WBTC Balance on Ethereum: *${balance}*`);
    return ctx.scene.leave();
  };
};
