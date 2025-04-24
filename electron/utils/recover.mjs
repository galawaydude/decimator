// my_recovery_script.js
import {recoverFile} from './ipfs_rs_library.mjs'; // Adjust path if needed

// const cidToRecover = 'YOUR_METADATA_CID_GOES_HERE'; // <--- IMPORTANT: Set this
const targetDirectory = './downloaded_files';     // Where to save the recovered file

async function runRecovery(cidToRecover) {
    console.log(`--- Starting Recovery Script for CID: ${cidToRecover} ---`);
    if (!cidToRecover || cidToRecover === 'YOUR_METADATA_CID_GOES_HERE') {
        console.error("Error: Please set the 'cidToRecover' variable in this script.");
        process.exit(1);
    }

    try {
        // Just call the recoverFile function directly
        const recoveredPath = await recoverFile(cidToRecover, targetDirectory);

        console.log(`\n--- Recovery Script Finished ---`);
        console.log(`Successfully recovered file.`);
        console.log(`>> Saved to: ${recoveredPath} <<`);

    } catch (error) {
        console.error("\n--- Recovery Script FAILED ---");
        console.error("Error:", error.message);
        // console.error(error.stack); // Uncomment for full stack trace
        process.exit(1);
    }
}

runRecovery("QmZrR67WGmu364AzVGxiWkt64cqpbKkLxNDazjnqbPKTLa");