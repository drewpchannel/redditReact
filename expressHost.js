const express = require('express');
const app = express();
const path = require('path');
const port = 8081;

app.get('/', (req, res) => {
	console.log('this runs')
	res.sendFile(path.join(__dirname, 'public'));
});

app.listen(port, () => {
	console.log(`Trying to load port file or port: ${port}`);
});