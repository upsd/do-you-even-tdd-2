const express = require('express');
const app = express();

app.listen(3000, () => console.log('API is running on http://localhost:3000'));

module.exports = app;