/* Código simplório, apenas para fornecer o serviço para a aplicação */

const express = require('express')
    ,app = express()   
    ,multer = require('multer')
    ,path =  require('path');

const upload = multer();

app.set('clientPath', path.join(__dirname, '../..', 'client'));
console.log(app.get('clientPath'));
app.use(express.static(app.get('clientPath')));
// app.use(bodyParser.raw({
//   type: 'multipart/form-data', 
//   limit : '2mb', 
//   verify(req, res, buf, encoding){
//     console.log('Encoding:' + encoding);
//   }}));

const pdfScraperRouter = require('../app/routes/pdfscrapper');
app.use('/pdfscraper', pdfScraperRouter);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

module.exports = app;