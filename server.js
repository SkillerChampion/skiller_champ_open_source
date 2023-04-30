const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json({ extended: false }));

app.get('/api/health', (req, res) => res.send('Open source app is running'));

app.use('/api/fortuneWheel', require('./src/routes/fortuneWheel'));

const PORT = 8080;

app.listen(PORT, function () {
  console.log(`Server started on PORT ${PORT}`);
});
