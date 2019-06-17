// const validNCM = ['33','37','40','42','48','57','84','85','90','91','92','94','95','96','97'];
const validNCM = ['15', '17', '18', '19', '20', '21', '23'];
// const invalidWords = ['CACA-NIQUEL', 'DISPLAY LCD', 'TELA LCD DE ELETRONICOS', 'BATERIA DE CELULAR', 'CHIFRE', 'ARMA', 'ISQUEIRO', 'CIGARRO', 'PNEU', 'RECEPTOR DE TV A CABO', 'FALSIF', 'CONTRAF', 'PARTES', 'PEÇAS', 'LNBF', 'CAPA', 'TELA', 'PELICULA', 'RECEPTOR DE SATELITE', 'IPTV'];
const invalidWords = [];
const valueThreshold = 2000.0;
const cellphoneThreshold = 600.0;

module.exports = class Item {
    constructor(ncm = '', text = '', amount = 0.0, value = 0.0){
        this._ncm = ncm;
        this._text = text.replace('- //', '');
        this._amount =  Number.parseFloat(amount.replace('.', '').replace(',', '.')).toFixed(2);
        this._value =  Number.parseFloat(value.replace('.', '').replace(',', '.')).toFixed(2);
    }

    get ncm(){
        return this._ncm;
    }

    set ncm(ncm){
        this._ncm = ncm;
    }

    get text(){
        return this._text;
    }

    get amount(){
        return this._amount;
    }

    get value(){
        return this._value;
    }

    toString(){
        return `> ${this._ncm} - ${this._text} - Amount: ${this._amount} - Value: ${this._value}`;
    }

    isValid(){
        const isNCM = validNCM.find( n => this._ncm.startsWith(n));
        const isInvalidWord = invalidWords.find( word => this._text.includes(word));
    
        //console.log(`NCM: ${this._ncm}, Descr: ${this._text}, NCM válido? ${isNCM}, contém palavra proibida: ${isInvalidWord}`);        
        //The whole point of this is just these validations...
        //Rule 1. Keep only goods with valid NCM which dos not contain an invalid keyword
        let answer = validNCM.find( n => this._ncm.startsWith(n)) != undefined && 
            invalidWords.find( word => this._text.includes(word)) == undefined;

        //Rule 2. Remove expansive items
        answer = answer && ( this.value / this.amount ) < valueThreshold;
        // console.log(`**** Value: ${this.value}, Amount: ${this.amount}, Per Unit: ${( this.value / this.amount )}`)

        //Rule 3. Value threshold for cellphones are a little lower
        if(this._ncm.startsWith('8517')){
            answer = answer && ( this.value / this.amount ) < cellphoneThreshold;
        }

        return answer;
    }
}