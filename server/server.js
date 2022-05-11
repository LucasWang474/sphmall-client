// Run this file with:
// node sever/server.js
// OR nodemon server/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');


const app = express();
app.use(history());
// noinspection JSCheckFunctionSignatures
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../dist')));


const PORT = 4744;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    console.log('http://localhost:' + PORT);
});
