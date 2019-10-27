# wbtc-telegram-bot

Telegram bot for seamless WBTC <> BTC conversion. Uses the [Telegraf](https://github.com/telegraf/telegraf) Telegram bot framework, bitcoinjs-lib, web3, and BitGo v2 API.

Bots are special [Telegram](https://telegram.org) accounts designed to handle messages automatically. Users can interact with bots by sending them command messages in private or group chats.

#### Table of Contents
- [wbtc-telegram-bot](#wbtc-telegram-bot)
      - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Setup](#setup)
  - [Running](#running)
  - [Interacting with the bot](#interacting-with-the-bot)
  - [FAQ](#faq)
    - [What are Atomic Swaps?](#what-are-atomic-swaps)
    - [How does Atomic Swaps work?](#how-does-atomic-swaps-work)
    - [How does WBTC<>BTC Atomic Swaps work with this bot?](#how-does-wbtcbtc-atomic-swaps-work-with-this-bot)
    - [What are Hash Time Locked Contracts (HTLC)?](#what-are-hash-time-locked-contracts-htlc)
    - [How long do Atomic Swaps take?](#how-long-do-atomic-swaps-take)
    - [Is there any fees imposed on the WBTC<>BTC Atomic Swap?](#is-there-any-fees-imposed-on-the-wbtcbtc-atomic-swap)
    - [What is the time lock condition for redemption?](#what-is-the-time-lock-condition-for-redemption)

## Installation

```
$ npm install
```

## Setup

1) Create an .env file in the root directory, containing your node API key and Telegram bot token. Note: Omit the bot prefix in the Telegram token.

e.g.
```
BTC_RPC_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ETH_RPC_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_TOKEN=xxxxxxxxx:xxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxx
```

2) Edit the RPC URLs, HTLC addresses, etc. in `./src/config/default.json`.


## Running

To run in development mode (restarts at every file change)
```
npm run dev
```

To run in production mode
```
npm run start
```

## Interacting with the bot

To start interacting with the bot, issue the following command:

```
/start
```

## FAQ

### What are Atomic Swaps?

An atomic swap enables the exchange of one cryptoasset for another cryptoasset without the need of centralized intermediaries. Atomic swaps can take place between two different blockchains as well. The swap is atomic, as it completes successfully or not at all. Both parties must acknowledge the receipt of funds within a given timeframe using a cryptographic hash function.

### How does Atomic Swaps work?

Hash Time Locked Contracts (HTLC) is the mechanism that enables atomic swaps.

1) Alice and Bob agree to swap 1 A-coin from blockchain-A with 1 B-coin from blockchain B respectively.
2) Alice generates a large random number, called the preimage _m_.
3) Alice creates an HTLC on blockchain-A, locked with the hashed preimage _h_, with the following conditions:
   
```
Pay 1 A-coin to Bob's public key if m for hash(m) is known and signed by Bob.
Pay 1 A-coin to her own public key, redeemable only after 24-hours, signed by herself .
```

4) Alice broadcasts the contract to blockchain-A and shares the transaction to Bob.
5) After Bob verifies the transaction, he creates an HTLC on blockchain-B, locked with _h_ as referenced from the transaction Alice broadcasted (Bob does not know m), wih the following conditions:
   
```
Pay 1 B-coin to Alice's public key if m for hash(m) is known and signed by Bob.
Pay 1 B-coin to his own public key, redeemable only after 12-hours, signed by himself.
```

6) Bob broadcasts the contract to blockchain-B and shares the transaction to Alice.
7) Alice submits a transaction in blockchain-B to redeem the 1 B-coin from the contract in blockchain-B using _m_.
8) The transaction reveals _m_, and Bob uses _m_ to submit a transaction in blockchain-A to redeem the 1 A-coin.
9) Should Alice fail to redeem the 1 B-coin within 12-hours, Bob can claim back his 1 B-coin from the contract in blockchain-B.
10) Should Bob fail to redeem the 1 A-coin within 24 hours, Alice can claim back her 1-A coin from the contract in blockchain-A.

### How does WBTC<>BTC Atomic Swaps work with this bot?

1) The bot acts as the maker and counterparty. It holds liquidity for both BTC and WBTC.
2) A user queries the available BTC/WBTC liquidity available. He can initiate an atomic swap with the amount capped at the available liquidity for either BTC or WBTC.
3) The atomic swap starts with the bot generating the preimage and creating the HTLC on either Bitcoin or Ethereum, depending on the destination cryptoasset of the swap for the user.
4) The bot locks the required amount minus fees on the HTLC.
5) The bot shares the transaction and hashed preimage for the user to verify.
6) Once verified, the user creates the HTLC in the corresponding blockchain, locked with the hashed preimage shared in the previous step.
7) The user shares the transaction hash for the bot to verify.
8) Once verified, the bot redeems the cryptoasset from the user's HTLC using the preimage. Once redeemed, the bot notifies the user as well of the preimage.
9) The bot expects the user to redeem the cryptoasset himself. So in the bot's perspective, the atomic swap flow has completed.

### What are Hash Time Locked Contracts (HTLC)?

HTLCs are essentially escrow contracts that enable conditional payments. HTLC is a time-bound smart contract between parties that involves the generation of a cryptographic hash function, which can be verified between them. HTLCs form the foundation for atomic swaps - a user and the counterparty create these HTLC escrows on their respective chains, and the funds that are deposited into the two escrows of the swap are properly locked and released. This dual escrow mechanism reduces the need to trust the counterparty for proper execution of the trade. The bot leverages the HTLC standards [BIP-199](https://github.com/bitcoin/bips/blob/master/bip-0199.mediawiki) and [ERC-1630](https://github.com/ethereum/EIPs/pull/1630).

### How long do Atomic Swaps take?

Atomic Swaps are currently executed on-chain, thus the process will move at the speed of the slowest chain.

### Is there any fees imposed on the WBTC<>BTC Atomic Swap?

There is a _0.5% fee_ imposed to the user.

### What is the time lock condition for redemption?

12 hours for the bot.
24 hours for the user.