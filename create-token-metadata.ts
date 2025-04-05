import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink,
} from "@solana-developers/helpers";
import {
    Connection,
    clusterApiUrl,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import { createUpdateMetadataAccountV2Instruction } from "@metaplex-foundation/mpl-token-metadata";

const user = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
    `We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);

// Substitute in your token mint account
const tokenMintAccount = new PublicKey("DST6Cp7J4MKHBh41j58b9xFLf9uZetkCVsEe5spfe6SL");

const updatedMetadataData = {
    name: "Jetharam",
    symbol: "JRG",
    uri: "https://amber-total-rat-430.mypinata.cloud/ipfs/bafkreigofhesdnw3og3xisxkxmhuvzyimlpfcqd7puxggirfr3vyi6sp2i",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
};

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID,
);

const metadataPDA = metadataPDAAndBump[0];

const transaction = new Transaction();

const updateMetadataAccountInstruction = createUpdateMetadataAccountV2Instruction(
    {
        metadata: metadataPDA,
        updateAuthority: user.publicKey,
    },
    {
        updateMetadataAccountArgsV2: {
            data: updatedMetadataData,
            updateAuthority: user.publicKey,
            primarySaleHappened: null,
            isMutable: true,
        },
    },
);

transaction.add(updateMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user],
);

const transactionLink = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet",
);

console.log(`Metadata updated! Explorer link is: ${transactionLink}`);

const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet",
);

console.log(`Check the updated token mint: ${tokenMintLink}`);

// https://explorer.solana.com/address/DST6Cp7J4MKHBh41j58b9xFLf9uZetkCVsEe5spfe6SL?cluster=devnet