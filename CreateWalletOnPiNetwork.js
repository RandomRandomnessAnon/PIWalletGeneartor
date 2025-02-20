const StellarSdk = require('stellar-sdk');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const horizonServer = "https://api.mainnet.minepi.com";
const networkPassphrase = "Pi Network";
const baseFee = 1000000;
const startingBalance = "1";

async function createAccount() {
    const secretKey = await new Promise(resolve => {
        readline.question("Enter the secret key of the new account: ", resolve);
    });

    const newKeypair = StellarSdk.Keypair.fromSecret(secretKey);

    const existingSecretKey = await new Promise(resolve => {
        readline.question('Enter your existing account secret key: ', resolve);
    });

    const server = new StellarSdk.Horizon.Server(horizonServer); // Use the destructured Server

    try {
        const existingKeypair = StellarSdk.Keypair.fromSecret(existingSecretKey);
        const existingAccount = await server.loadAccount(existingKeypair.publicKey());

        const transaction = new StellarSdk.TransactionBuilder(existingAccount, {
            networkPassphrase: networkPassphrase,
            baseFee: baseFee
        })
            .addOperation(StellarSdk.Operation.createAccount({
                destination: newKeypair.publicKey(),
                startingBalance: startingBalance
            }))
            .setTimeout(30)
            .build();

        transaction.sign(existingKeypair);

        const response = await server.submitTransaction(transaction);
        console.log("Transaction successful!");
        console.log(response);

    } catch (error) {
        console.error("Transaction failed:");

        if (error.response) {
            console.error("Status Code:", error.response.status);
            console.error("Response:", error.response.data);
            if (error.response.data.extras && error.response.data.extras.result_codes) {
                console.error("Result Codes:", error.response.data.extras.result_codes);
            }
        } else if (error.message) {
            console.error("Error Message:", error.message);
        } else {
            console.error("Unknown Error:", error);
        }

    } finally {
        readline.close();
    }
}

createAccount();