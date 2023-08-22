const express = require('express');
const session = require('express-session');
const compression = require('compression')
const i18n = require('./i18n');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const join = require('path').join;
const sticky = require('sticky-session');
const cluster = require('cluster');
const mongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const fs = require('fs');
const passport = require('passport');
const morgan = require('morgan');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const methodOverride = require('method-override');
const config = require('./config/config.json');
const mongoose = require('mongoose');
const { sequelize } = require('./models/rdbms/index');

app.use(i18n);
app.use(morgan('dev'));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'public')));
app.use("/public", express.static(__dirname + '/public'));

const constant = require('./config/constant.json')
const helper = require('./helper/helper.js');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}))
//app.use(cors())
app.use(
    cors({
        origin: config.CURL_ORIGIN,//pass host url here
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true
    })
);
// parse application/json
app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
//database url
let dbUrl = helper.getDatabaseUrl();
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET_CODE,
        store: new mongoStore({
            url: dbUrl,
            collection: 'sessions'
        })
    })
);
// use passport session
app.use(passport.initialize());
app.use(passport.session());
// compress responses
app.use(compression())

// server-sent event stream
app.get('/events', function (req, res) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')

    // send a ping approx every 2 seconds
    let timer = setInterval(function () {
        res.write('data: ping\n\n')

        // !!! this is the important part
        res.flush()
    }, 2000)

    res.on('close', function () {
        clearInterval(timer)
    })
})
app.get('/test', function (req, res) {
    res.json({ message: 'index' });
})

const PORT = process.env.PORT || 8080

const http = require('http').createServer(app);


if (!sticky.listen(http, Number(PORT))) {
    http.once('listening', function () {
        console.log('Server started on port ' + PORT);
        // i18n.init()
    });

    if (cluster.isMaster) {
        let numWorkers = require('os').cpus().length;
        console.log('Master cluster setting up ' + numWorkers + ' workers...');

        for (let i = 0; i < numWorkers; i++) {
            cluster.fork();
        }

        cluster.on('online', function (worker) {
            console.log('Worker ' + worker.process.pid + ' is online');
        });

        cluster.on('exit', function (worker, code, signal) {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            cluster.fork();
        });
    }
} else {
    console.log('- Child server started on port ' + PORT + ' case worker id=' + cluster.worker.id);
}


//Read all model files
const models = join(__dirname, './models');
try {
    fs.readdirSync(models)
        .filter(file => ~file.search(/^[^.].*\.js$/))
        .forEach(file => require(join(models, file)))
} catch (err) {
    console.log(err)
}

// console.log('zzzzzzzzzzzzzzzzzzzzzzzzz')

connect();
async function connect() {
    await mongoose.connection.on('error', console.log).on('disconnected', connect).once('open', function () {
        console.log('MongoDB connected successfully!!')
        helper.initiateSettings().then((res) => {
            console.log('Settings initiated successfully!!')
        }).catch((err) => {
            console.log('Settings initiated failed!!')
        })
    });
    await sequelize.authenticate()
    // console.log('dbUrl', dbUrl)
    return mongoose.connect(dbUrl, {
        keepAlive: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
const index = require('./routes/index');
app.use(index)

//mysql Connection
// require('./models/rdbms');

//firebase
require('./firebase/firebase.js')(app);