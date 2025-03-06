const express = require('express');
const cors = require('cors');

/*const Grant = require('./Grant.js');
const ALEX = require('./Alex.js');
const CAPITALS= require('./Christian.js');
const EESHA = require('./Eesha.js');
*/
const discussion = require('../backend/AI.js');

const  app= express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
ALEX();
EESHA("Shirt", "Sweater");
Grant("Michigan", "Savory");
CAPITALS("Brasil");
*/

discussion("Hola, me llamo Grant. Me gustar peros.", "spanish", "beginner");