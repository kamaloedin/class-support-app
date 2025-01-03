const { check } = require('express-validator');

const phoneChecks = [
  check('phone', 'Phone number must be Indonesia phone number').isMobilePhone('id-ID'),
];

module.exports = { phoneChecks };
