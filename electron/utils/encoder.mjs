// my_encoder_script.js
import {encodeFile} from './ipfs_rs_library.mjs'; // Adjust path if needed

// const myFilePath = './text.txt'; // The file you want to encode

async function runEncode(myFilePath) {
    console.log(`--- Starting Encode Script for ${myFilePath} ---`);
    try {
        // Just call the encodeFile function directly
        const metadataCid = await encodeFile(myFilePath);

        console.log(`\n--- Encode Script Finished ---`);
        console.log(`Successfully encoded.`);
        console.log(`>> Metadata CID: ${metadataCid} <<`); // Make CID prominent
        console.log(`(Use this CID for recovery)`);

        return metadataCid;
    } catch (error) {
        console.error("\n--- Encode Script FAILED ---");
        console.error("Error:", error.message);
        // console.error(error.stack); // Uncomment for full stack trace
        process.exit(1);
    }
}

export default runEncode;

// runEncode("pixx.txt");