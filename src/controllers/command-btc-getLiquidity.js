const fs = require('fs');

module.exports = () => {
  return async ctx => {
    const { axios, replyWithMarkdown } = ctx;
    
    const config = JSON.parse(
      fs.readFileSync('src/config/default.json', 'utf8')
    );

    const balance = (await axios.get(`/addressbalance/${config.contracts.WBTCAtomicSwapBTC}`))[1];

    replyWithMarkdown(`BTC Balance on Bitcoin: *${balance}*`);
    return ctx.scene.leave();
  };
};
