// require modules
const express = require('express');
const router = express.Router();
//create app
const app = express();

//configure app
let port = 8000;
let host = 'localhost';
app.set('view engine', 'ejs');

//mount middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

router.get('/getNumber', (req,res)=>{
    var num = 10;
    for(let i = 0;i<num;i++){
        console.log("Inside router", num)
        return num*5
    }
    return num
})

//set up routes
app.get('/getNumber', (req, res)=>{
    var num = 10;
    for(let i = 0;i<num;i++){
        console.log("Inside get", num)
        return num*5
    }
});

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error")
    }
    res.status(err.status);
    res.render('error', { error: err });
});

app.listen(port, host, () => {
    console.log('The server is running at port', port);
});