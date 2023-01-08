const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const logger = require('./lib/logger');
const api = require('./routes/index');
const errorHandler = require('./lib/errorHandler');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', api);

// error handle
app.use((err, req, res, next) =>{
    errorHandler.handle(err, req, res, next);
})

// server start!
const port = process.env.PORT || 3001;

app.listen(port, () => logger.info(`Listening on port ${port}...`));

app.on('error', (error) => {
    if(error.syscall != 'listen'){
        throw error;
    }

    const bind = typeof port === 'string'? 'Pipe ' + port: 'Port ' + port;
    switch(error.code){
        case 'EACCES':
            logger.error('Error Port privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error('Port already in used');
            process.exit(1);
            break;
        default:
            throw error;
    }
})