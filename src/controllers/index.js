const Markup = require('telegraf/markup');
const Menu = require('telegraf-inline-menu');
const Stage = require('telegraf/stage');
const atomicSwap = require('./scene-atomic-swap');
const checkLiquidity = require('./scene-check-liquidity');
const logger = require('../logger');
const faq = require('./command-faq');
const getLiquidityBTC = require('./command-btc-getLiquidity');
const getPubKeyHashBTC = require('./command-btc-getPubKeyHash');
const getLiquidityETH = require('./command-eth-getLiquidity');
const isValidAddress = require('./command-isValidAddress');

module.exports = app => {
  const menu = new Menu('Main Menu');
  const stage = new Stage([
    atomicSwap(getLiquidityBTC, getLiquidityETH),
    checkLiquidity(getLiquidityBTC, getLiquidityETH),
  ]);

  app.use(stage.middleware());
  app.command('faq', faq());
  app.command('getliquiditybtc', getLiquidityBTC());
  app.command('getLiquidityBTC', getLiquidityBTC());
  app.command('getpubkeyhashbtc', getPubKeyHashBTC());
  app.command('getPubKeyHashBTC', getPubKeyHashBTC());
  app.command('getliquidityeth', getLiquidityETH());
  app.command('getLiquidityETH', getLiquidityETH());
  app.command('isvalidaddress', isValidAddress());
  app.command('isValidAddress', isValidAddress());
  
  menu.urlButton('Click here for more information about Wrapped BTC', 'https://wbtc.network');
  menu.setCommand('start');

  menu.button('Check available liquidity', 'initiate-check-liquidity', {
    doFunc: ctx => {
      ctx.scene.enter('check-liquidity');
    }
  });

  menu.button('Initiate Atomic Swap', 'initiate-atomic-swap', {
    doFunc: ctx => {
      ctx.scene.enter('atomic-swap');
    },
  });

  menu.button('FAQ', 'faq', {
    doFunc: faq(),
  });

  app.use(menu.init({
    backButtonText: 'Go back',
    mainMenuButtonText: 'Return to main menu',
  }));

  logger.info('Initialized controllers');
};
