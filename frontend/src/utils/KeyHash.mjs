// keyhash.mjs (browser-compatible version)

/**
 * Gets user key from localStorage, hashes it using Web Crypto API, and returns the hash.
 * @returns {Promise<string|null>} - SHA-256 hash of userKey in hex, or null if not found.
 */
export async function getHashedUserKey() {
    const userKey = localStorage.getItem("userKey");
    if (!userKey) return null;
  
    const encoder = new TextEncoder();
    const data = encoder.encode(userKey);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  
    return hashHex;
  }
  