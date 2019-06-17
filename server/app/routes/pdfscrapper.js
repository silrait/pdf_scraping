const express = require('express');
const fs = require('fs');
const multer  = require('multer');
const upload = multer();
const api = require('../api');


pdfScraperRouter = express.Router();

pdfScraperRouter.get('/', (req, res, next) => {
    console.log(req.body);

    res.status(200).send('Olá!');
  });

pdfScraperRouter.post('/', upload.single('file'), api.parse);

module.exports = pdfScraperRouter;