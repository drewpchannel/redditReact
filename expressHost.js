const express = require('express');
const app = express();
const path = require('path');

app.listen(7070, () => {
	console.log('listening 7070...');
})

app.use(express.static(path.join(__dirname, 'public')));
