const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/fortuneWheel', require('./src/routes/fortuneWheel'));

app.get('/api/health', (req, res) => res.send('App is running'));

const PORT = 8000;

app.listen(PORT, function () {
  console.log(`Server started on PORT ${PORT}`);
});
