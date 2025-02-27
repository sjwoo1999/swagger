const util = require('util');

module.exports = {
  hello: (req, res) => {
    const name = req.query.name || 'stranger';
    const message = util.format('Hello, %s!', name);
    res.json({ message });
  }
};