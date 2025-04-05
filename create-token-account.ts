import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
);

// Substitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey("DST6Cp7J4MKHBh41j58b9xFLf9uZetkCVsEe5spfe6SL");

// Here we are making an associated token account for our own address, but we can
// make an ATA on any other wallet in devnet!
// const recipient = new PublicKey("SOMEONE_ELSES_DEVNET_ADDRESS");
const recipient = user.publicKey;

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient,
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet",
);

console.log(`Created token Account: ${link}`);

// https://explorer.solana.com/address/5oNZgsZFjaHsjVqTf1XHFxdwAgKsPfm9DmBuweX8SK7e?cluster=devnet