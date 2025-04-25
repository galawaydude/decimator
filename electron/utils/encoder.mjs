// my_encoder_script.js
import {encodeFile} from './ipfs_rs_library.mjs'; // Adjust path if needed
import path from 'path';

async function runEncode(myFilePath) {
    console.log(`--- Starting Encode Script for ${myFilePath} ---`);
    try {
        const result = await encodeFile(myFilePath);
        console.log(`\n--- Encode Script Finished ---`);
        console.log(`Successfully encoded.`);
        console.log(`>> Metadata CID: ${result.cid} <<`);
        console.log(`(Use this CID for recovery)`);

        return result;
    } catch (error) {
        console.error("\n--- Encode Script FAILED ---");
        console.error("Error:", error.message);
        throw error; // Throw error instead of exiting process to handle it properly
    }
}

export default runEncode;

// runEncode("pixx.txt");