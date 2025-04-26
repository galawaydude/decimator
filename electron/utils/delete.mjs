import { deleteFile } from './ipfs_rs_library.mjs'; // Same pattern

/**
 * Deletion function that returns result instead of exiting the process.
 * @param {string} cidToDelete
 */
export async function runDelete(cidToDelete) {
  console.log(`--- Starting Deletion Script for CID: ${cidToDelete} ---`);

  if (!cidToDelete || cidToDelete === 'YOUR_METADATA_CID_GOES_HERE') {
    throw new Error("Error: Please provide a valid metadata CID.");
  }

  try {
    const deletionReport = await deleteFile(cidToDelete);

    console.log(`\n--- Deletion Script Finished ---`);
    console.log(`Successfully deleted shards and metadata.`);
    return deletionReport;
  } catch (error) {
    console.error("\n--- Deletion Script FAILED ---");
    console.error("Error:", error.message);
    throw error;
  }
}
