// keyhash.mjs (browser-compatible version)

async function sha256(message) {
  // Encode message as UTF-8
  const msgBuffer = new TextEncoder().encode(message);
  // Hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  // Convert hash to hex string
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Gets user key from localStorage and returns its SHA-256 hash.
 * @returns {Promise<string|null>} - SHA-256 hash of userKey in hex, or null if not found.
 */
export async function getHashedUserKey() {
  const userKey = localStorage.getItem("userKey");
  if (!userKey) return null;
  return await sha256(userKey);
}
  