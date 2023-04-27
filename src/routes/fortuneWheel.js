const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { wheelData2000, wheelData500, wheelData100, BET_AMOUNTS } = require('../utils/constants');

//@route GET api/fortuneWheel
//desc - Test Route
//@access Public

router.get('/', async (req, res) => {
  try {
    res.json({
      wheelData2000: wheelData2000,
      wheelData500: wheelData500,
      wheelData100: wheelData100
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/rotateWheel',
  [
    check('betAmount', 'Bet Amount is empty').not().isEmpty(),
    check('betAmount').custom((value) => {
      if (
        value === BET_AMOUNTS.PLATINUM ||
        value === BET_AMOUNTS.GOLD ||
        value === BET_AMOUNTS.SILVER
      ) {
        return true;
      }
      throw new Error('Invalid bet Amount');
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let wheelData;

      const { betAmount = 0 } = req.body;

      if (betAmount === BET_AMOUNTS.PLATINUM) {
        wheelData = wheelData2000;
      } else if (betAmount === BET_AMOUNTS.GOLD) {
        wheelData = wheelData500;
      } else {
        wheelData = wheelData100;
      }

      // Length = 8
      const slicesLength = wheelData.length; 

      // Randomly chooses 1 slice out of 8 slices
      const random = Math.floor(Math.random() * slicesLength); 
      const randomSlice = wheelData[random];

      // Return randomly chosen slice
      res.json(randomSlice); 
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;