const path = require('path');
// Local local env vars
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

module.exports = {
  siteUrl: process.env.SITE_URL,
  priority: 1,
  generateRobotsTxt: true,
};
