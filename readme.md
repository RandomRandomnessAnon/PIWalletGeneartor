# PIWalletGenerator

PIWalletGenerator is for generating a new PI seed phrase (24 word mneomic) and Public/Secret key pair and creating it on the PI Network.

# Motivation for creation
I wanted to have a seperate paper wallet/cold wallet and figured others might also as well as other probable use cases to a wallet outside of the PI App

# Scripts

Three seperate scripts:

**DecodeWallet.js** - Inputs your existing PI Wallet's 24-word mneomic and returns it's public/secret key pair
> [!NOTE]
> You must have an existing wallet on the PI Network to create a new wallet from. This will be used in CreateWalletOnPiNetwork.js

**WalletKeyGen.js** - generates a 24-word mnemonic as well as public/secret key pair

**CreateWalletOnPiNetwork.js** - Using an existing secret corresponding to an existing account on the PI Network, you are able to create the new wallet whose keys were created in WalleteyGen.js

## Requirements/installation
NodeJS/NPM - download from https://nodejs.org/en/download

Package Dependencies (run in your woring directory where you cloned)
```bash
npm install stellar-sdk @hawkingnetwork/ed25519-hd-key-rn bip39 readline
```

## Usage

```javascript
node DecodeWallet.js
//inputs your existing PI Wallet's 24-word mneomic and returns it's public/secret key pair
```

```javascript
node WalletKeyGen.js
//generates a 24-work mnemonic as well as public/secret key pair
```

```javascript
node CreateWalletOnPiNetwork.js
//First input is a secret key corresponding to a wallet that already exists on the PI network
//Second input is the newly created secret key from WalletKeyGen.js
```

Congratulations, you now have a new wallet on PI Network.

## Contributing

Pull requests are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)

