// recover.mjs
import { recoverFile } from './ipfs_rs_library.mjs'; // Adjust if needed

/**
 * Recovery function that returns result instead of exiting the process.
 * @param {string} cidToRecover
 * @param {string} targetDirectory
 */
export async function runRecovery(cidToRecover, targetDirectory) {
  console.log(`--- Starting Recovery Script for CID: ${cidToRecover} ---`);

  if (!cidToRecover || cidToRecover === 'YOUR_METADATA_CID_GOES_HERE') {
    throw new Error("Error: Please provide a valid metadata CID.");
  }

  if (!targetDirectory) {
    throw new Error("Error: Please provide a valid output directory.");
  }

  try {
    const recoveredPath = await recoverFile(cidToRecover, targetDirectory);

    console.log(`\n--- Recovery Script Finished ---`);
    console.log(`Successfully recovered file.`);
    console.log(`>> Saved to: ${recoveredPath} <<`);

    return recoveredPath;
  } catch (error) {
    console.error("\n--- Recovery Script FAILED ---");
    console.error("Error:", error.message);
    throw error;
  }
}