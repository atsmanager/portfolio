// Run this once: node generate-hash.js
// Copy the hash and put it in .env as ADMIN_PASSWORD_HASH
import bcrypt from "bcryptjs";

const password = "Ashwani@2005";
const hash = await bcrypt.hash(password, 10);
console.log("Password Hash:", hash);
