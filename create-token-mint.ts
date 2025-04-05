import { createMint } from "@solana/spl-token";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink
} from "@solana-developers/helpers";

import { Connection, clusterApiUrl } from "@solana/web3.js";

//const connection = new Connection("http://127.0.0.1:8899");
const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

// const balance = await connection.getBalance(user.publicKey);
// console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL} SOL`);

const tokenMint = await createMint(connection, user, user.publicKey, null, 2);
const link = getExplorerLink("address", tokenMint.toString(), "devnet");
console.log(`Finished! Created token mint: ${link}`)


//command to run  - npx esrun create-token-mint
//https://explorer.solana.com/address/DST6Cp7J4MKHBh41j58b9xFLf9uZetkCVsEe5spfe6SL?cluster=devnet