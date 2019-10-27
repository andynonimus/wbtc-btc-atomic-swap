const rateLimit = require('telegraf-ratelimit');

module.exports = () => {
  const limitConfig = {
    window: 1000,
    limit: 5,
    onLimitExceeded: (ctx) => ctx.reply('Too many requests'),
  };

  return rateLimit(limitConfig);
};
