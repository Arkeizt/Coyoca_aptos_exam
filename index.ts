import { Aptos, AptosConfig, Network, Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

const PRIVATE_KEY = new Ed25519PrivateKey("ed25519-priv-0x42c4649b515307ccf8bcb02da9ccec1b85c556b14a4182d874b4063f746949c5");

const MY_ACCOUNT = Account.fromPrivateKey({
  privateKey: PRIVATE_KEY,
});

//pang test kung reyal ang account address
console.log("Account address:", MY_ACCOUNT.accountAddress.toString());

async function main() {

    console.log("test");

    const myBalance = await aptos.getAccountAPTAmount({
        accountAddress: MY_ACCOUNT.accountAddress,
      });


      const transaction = await aptos.transaction.build.simple({
        sender: MY_ACCOUNT.accountAddress,
        data: {
          function:
            "0x777b93e13ff2a1bc872eb4d099ae15a52fb70f2f01dd18d7c809e217fb0e543e::tba_exam::add_participant",
          functionArguments: [
            "0x539f880b3da2bc33d98b5efbf611eb76b6a980b0fdb15badb537767e0767d6e3",
            "Fionnah Keiz Coyoca",
            "https://github.com/Arkeizt",
            "fionnahkeiz@gmail.com",
            "leearkeiztt#7926",
          ],
        },
      });

      const senderAuthenticator = aptos.transaction.sign({
        signer: MY_ACCOUNT,
        transaction,
      });

      const pendingTransaction = await aptos.transaction.submit.simple({
        transaction,
        senderAuthenticator,
      });

      const txnResult = await aptos.waitForTransaction({
        transactionHash: pendingTransaction.hash,
      });
      
      // optional: so we can see if it succeeded
      
      console.log(
        `Transaction completed with status: ${
          txnResult.success ? "SUCCESS" : "FAILURE"
        }`
      );
}


main().catch(console.error);