const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const sequlize = require('./db/connect');
const app = express();
const errorhandler = require('./middleware/errorhandler');
const multer = require('multer');


//import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product')


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


//multer options
const fileStorage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);

    }else{
        cb(null, false);
    }
}



//bodyparsers
app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('images'))



app.use('/public', express.static(path.join(__dirname, 'public')))


app.use('/user', authRoutes)
app.use('/products', productRoutes)

port = 8080;

app.use(errorhandler)


sequlize.authenticate()
.then(() => {
    app.listen(port, () => {
        console.log('server is listening on port ' + port + '....')
    })
})
.catch(error => console.log(error))

