const express = require('express');
const path = require('path');

const backendRouter = require('./backend/router');
const PORT = process.env.PORT || 5000;

app = express();

// handle the frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// handle the backend
app.use(backendRouter);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
