// Generate secret key for JWT

import generateSecret from "./src/lib/utils/generateSecret.js";

const secret = generateSecret();
console.log(secret);
