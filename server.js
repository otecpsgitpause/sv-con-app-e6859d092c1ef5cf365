const sts = require('strict-transport-security');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var methodOverride = require('method-override');
var jwt = require('jsonwebtoken'); //no use
var cluster = require('cluster');
var numCPUs= require('os').cpus().length;
var app = express();
const globalSTS = sts.getSTS({'max-age':{'days': 365}});
var secureRoutes = express.Router();
app.set('port', (process.env.PORT || 8001));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());
app.use(globalSTS);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT,POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var conector_router = require('./router/conector-router');

app.use('/Z685yXXh4fsysAqN3C9DakwYZ39Hx72BRoMXFzit68ElIrKNnMT',conector_router);

if(cluster.isMaster){
    for(var i=0; i < numCPUs;i++){
        cluster.fork();
        cluster.on('exit', function(worker, code, signal)
        {
          console.log('worker ' + worker.process.pid + ' died');
        });
    }
}else{
    app.listen(app.get('port'), () => {
        console.log('app running port', app.get('port'));
    })
}


