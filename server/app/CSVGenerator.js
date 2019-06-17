'use strict';
const { Parser } = require('json2csv');

module.exports = class CSVGenerator {
    constructor(processes){
        this._processes = processes;

        this._fields = [
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

        this._opts = { fields: this._fields, unwind: '_items' };
    }

    generate(){
        try {
            const parser = new Parser(this._opts);
            return parser.parse(this._processes);
        } catch (err) {
            console.error(err);
        }
    }
}