const loggerMiddleware = require("./routes/middleware/loggerMiddleware");

const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(require('helmet')());
app.use(express.json());
app.use(cors());


//route
app.use(loggerMiddleware);
app.use('/api/user', require('./routes/user'));
app.use('/api/dailySale', require('./routes/dailySale'));

app.get('/', (req,res)=>{
    res.json("Hello world!");
})

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => app.listen(port, () => {
        console.log("Server is running on port: " + port);
    }))
    .catch((error) => console.log(error));

mongoose.set("useFindAndModify",false);
