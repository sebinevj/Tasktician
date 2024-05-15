const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');

//const PORT = process.env.PORT;
const PORT = 80;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


// Mount our API router.
const APIrouter = require('./routers/routes');

app.use(APIrouter);

// Ask our server to listen for incoming connections
app.listen(PORT, () =>  {
  console.log(`Server listening on port: ${PORT}`)
});