const PdfScraper = require('../PDFScraper');
const CSVGenerator = require('../CSVGenerator');

var api = {}

api.parse = function(req, res, next) {  
   new PdfScraper(req.body.file).parse()
      .then(processes => {
         // console.log("E os processos?");
         // console.log(processes);
         return new CSVGenerator(processes).generate();
      })
      .then(csv => {
         res.status(200).attachment('result.csv').send(csv);
      })
      .catch(error => {
         console.log(error);      
      });  
};

module.exports = api;