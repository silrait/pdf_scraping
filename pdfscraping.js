'use strict';
let fs = require('fs'),
PDFParser = require("pdf2json");
const { Parser } = require('json2csv');

const Item = require('./Item.js');
const Process = require('./Process.js');

let pdfParser = new PDFParser(this,1);
let lines = [];
let processes = [];

function genereateCSV(){
    const fields = [
        {
            label: 'Processo',
            value: '_number',
        },
        {
            label: 'NCM',
            value: '_items._ncm',
        },
        {
            label: 'Descrição',
            value: '_items._text',
        },
        {
            label: 'Quantidade',
            value: '_items._amount'
        },
        {
            label: 'Valor',
            value: '_items._value'
        }];
    const opts = { fields, unwind: '_items' };
     
    try {
      const parser = new Parser(opts);
      const csv = parser.parse(processes);

      fs.writeFileSync('./bazar.content.csv', csv);
    } catch (err) {
      console.error(err);
    }
}


pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );

pdfParser.on("pdfParser_dataReady", pdfData => {
    let process = null;
    let item = null;

    for(let j=0; j<pdfData.formImage.Pages.length;j++){
        let orderedElements = pdfData.formImage.Pages[j].Texts.sort((a,b) => {
            //arrange the text
            //Vertically and Horizontally aligned
            let cmp = a.y - b.y;
            if(!cmp){
                cmp = a.x - b.x;
            }

            return cmp;
        });

        for(let i = 0; i < orderedElements.length; i++){
            let text = decodeURIComponent(orderedElements[i].R[0].T);

            //look for processes numbers
            let foundProcess = text.match(/[0-9]{17}/);
            if(foundProcess){
                //start collecting process data
                process = new Process(foundProcess[0]);
            }    

            let foundNCM = text.match(/\b[0-9]{8}\b/);
            if(foundNCM){
                let description = decodeURIComponent(orderedElements[i+7].R[0].T);
                //Save previous Item and Create a new One
                if(item && item.isValid()){
                    process.addItem(item); 
                }                

                item = new Item(
                    foundNCM[0], //NCM
                    description, //Text
                    decodeURIComponent(orderedElements[i+2].R[0].T), //Amount                
                    decodeURIComponent(orderedElements[i+5].R[0].T), //Value
                    );
            }

            if(text.startsWith('Total do Processo')){
                //must Add the item, or the only one
                if(item.isValid()){
                    process.addItem(item); 
                }                
                //Value is at next line
                let value = decodeURIComponent(orderedElements[i+1].R[0].T);
                process.value = 
                    Number.parseFloat(value.replace('.', '').replace(',', '.'));

                if(process.itemsCount > 0){
                    processes.push(process);
                }            
                item = null; // no more items for you
            }
        }
    }

    genereateCSV();
});

pdfParser.loadPDF("./conta_210.pdf");
