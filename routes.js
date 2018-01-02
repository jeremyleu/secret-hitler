const express = require('express');

const router = express.Router();

// Define the about route
router.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


module.exports = router;
