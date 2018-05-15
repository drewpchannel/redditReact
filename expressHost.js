const express = require('express');
const app = express();
const path = require('path');
const port = 8081;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	console.log('this runs')
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT, () => {
	console.log(`Trying to load port file or port: ${port}`);
});