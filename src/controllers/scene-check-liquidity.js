const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/wizard');

module.exports = (getBalanceBTC, getBalanceETH) => {
  return new Scene('check-liquidity',
    (ctx) => {
      ctx.reply('Which chain?',
        Markup
          .keyboard(
            [
              ['Bitcoin', 'Ethereum'],
            ],
            { columns: 2 })
          .oneTime()
          .extra()
      );
      
      return ctx.wizard.next();
    },
    (ctx) => {
      if (ctx.message.text === 'Bitcoin') {
        return ctx.wizard.steps[2](ctx);
      } else {
        return ctx.wizard.steps[3](ctx);
      }
    },
    getBalanceBTC(),
    getBalanceETH(),
  );
};