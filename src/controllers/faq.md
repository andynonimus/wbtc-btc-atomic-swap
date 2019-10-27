*WHAT ARE ATOMIC SWAPS?*

An atomic swap enables the exchange of one cryptoasset for another cryptoasset without the need of centralized intermediaries. Atomic swaps can take place between two different blockchains as well. The swap is atomic, as it completes successfully or not at all. Both parties must acknowledge the receipt of funds within a given timeframe using a cryptographic hash function.

*HOW DOES ATOMIC SWAPS WORK?*

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

*HOW DOES WBTC<>BTC ATOMIC SWAPS WORK WITH THIS BOT?*

1) The bot acts as the maker and counterparty. It holds liquidity for both BTC and WBTC.
2) A user queries the available BTC/WBTC liquidity available. He can initiate an atomic swap with the amount capped at the available liquidity for either BTC or WBTC.
3) The atomic swap starts with the bot generating the preimage and creating the HTLC on either Bitcoin or Ethereum, depending on the destination cryptoasset of the swap for the user.
4) The bot locks the required amount minus fees on the HTLC.
5) The bot shares the transaction and hashed preimage for the user to verify.
6) Once verified, the user creates the HTLC in the corresponding blockchain, locked with the hashed preimage shared in the previous step.
7) The user shares the transaction hash for the bot to verify.
8) Once verified, the bot redeems the cryptoasset from the user's HTLC using the preimage. Once redeemed, the bot notifies the user as well of the preimage.
9) The bot expects the user to redeem the cryptoasset himself. So in the bot's perspective, the atomic swap flow has completed.

*WHAT ARE HASH TIME LOCKED CONTRACTS (HTLC)?*

HTLCs are essentially escrow contracts that enable conditional payments. HTLC is a time-bound smart contract between parties that involves the generation of a cryptographic hash function, which can be verified between them. HTLCs form the foundation for atomic swaps - a user and the counterparty create these HTLC escrows on their respective chains, and the funds that are deposited into the two escrows of the swap are properly locked and released. This dual escrow mechanism reduces the need to trust the counterparty for proper execution of the trade. The bot leverages the HTLC standards BIP-199 and ERC-1630.

*HOW LONG DO ATOMIC SWAPS TAKE?*

Atomic Swaps are currently executed on-chain, thus the process will move at the speed of the slowest chain.

*IS THERE ANY FEES IMPOSED ON THE WBTC<>BTC ATOMIC SWAP?*

There is a _0.5% fee_ imposed to the user.

*WHAT IS THE TIME LOCK CONDITION FOR REDEMPTION?*

12 hours for the bot.
24 hours for the user.