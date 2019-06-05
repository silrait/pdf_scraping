const express = require('express');
const fs = require('fs');
const multer  = require('multer');
const upload = multer();


pdfScraperRouter = express.Router();

pdfScraperRouter.get('/', (req, res, next) => {
    console.log(req.body);

    res.status(200).send('Olá!');
  });

pdfScraperRouter.post('/', upload.single('file'), (req, res, next) => {
    console.log(req.body);

    fs.writeFileSync('./incoming.pdf', req.body.file);

    res.status(200).send('POST!');
});

module.exports = pdfScraperRouter;