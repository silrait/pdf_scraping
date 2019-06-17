'use strict';
const fs = require('fs');
const buffer = require('buffer');
const PDFParser = require("pdf2json");
const Item = require('./Item.js');
const Process = require('./Process.js');

module.exports = class PDFScraper {
    constructor(PDFString){
        this._processes = [];
        //Because multer multi-part is tranfering all data in UTF-8 for now.
        //latin1 is an alias for ISO-8859-1
        this._buffer = buffer.transcode(Buffer.from(PDFString), 'utf8', 'latin1');
        this._pdfParser = new PDFParser(this,1);        
    }

    parse(){
        return new Promise((resolve, reject) =>{
            this._pdfParser.on("pdfParser_dataError", errData => {
                console.log(errData.parserError);
                reject(errData);
            });

            this._pdfParser.on("pdfParser_dataReady", pdfData => {
                let process = null;
                let item = null;

                for(let j=0; j<pdfData.formImage.Pages.length;j++){
                    let orderedElements = pdfData.formImage.Pages[j].Texts.sort((a,b) => {
                        //arrange the text
                        //Vertically and Horizontally aligned
                        //It seems the lines aren't perfectly aligned
                        let cmp = (Math.abs(a.y - b.y) > 0.5)? a.y - b.y : 0;
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
                            //Add a new one at very beginning or at every new process
                            if(!process || (process && process.number != foundProcess[0])){
                                process = new Process(foundProcess[0]);
                            }                
                        }      
            
                        let foundNCM = text.match(/\b[0-9]{8}\b/);
                        if(foundNCM){
                            let description = decodeURIComponent(orderedElements[i+6].R[0].T);
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
                                this._processes.push(process);
                            }            
                            item = null; // no more items for you
                        }
                    }
                }

                resolve(this._processes);
            });

            this._pdfParser.parseBuffer(this._buffer);
        });
    }
}