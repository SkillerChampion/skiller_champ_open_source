const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/fortuneWheel', require('./src/routes/fortuneWheel'));

//Make avail static asset in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'server.js'));
//   });
// }

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
  console.log(`Server started on PORT ${PORT}`);
});
