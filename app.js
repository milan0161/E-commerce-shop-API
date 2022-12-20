const express = require('express');
const bodyParser = require('body-parser');
const sequlize = require('./db/connect');
const app = express();
const errorhandler = require('./middleware/errorhandler');


//import routes
const authRoutes = require('./routes/auth')

//bodyparser
app.use(bodyParser.json());


//cors options
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200)
    }
    next()
});

app.use('/user', authRoutes)

port = 8080;

app.use(errorhandler)


sequlize.authenticate()
.then(() => {
    app.listen(port, () => {
        console.log('server is listening on port ' + port + '....')
    })
})
.catch(error => console.log(error))

