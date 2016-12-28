const crypto = require('crypto');

function createHashCode(str) {
  const secret = 'longzhu-vue';
  const hash = crypto.createHmac('sha256', secret)
                     .update(str)
                     .digest('hex');
  return hash.substr(0, 11);
}


module.exports = createHashCode;