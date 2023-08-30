require('dotenv').config();
const fs = require("fs");
const user = process.env.ENV_USER || "";
const pass = process.env.ENV_PASS || "";
const content = `const USER = "${user}";
const PASS = "${pass}";
export { USER, PASS };
`;
const cb = () => {};

// Write the content to a markdown file.
fs.writeFile('public/theme/assets/scripts/config.js', content, cb);