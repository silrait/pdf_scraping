const validNCM = ['33','37','40','42','48','57','84','85','90','91','92','94','95','96','97'];
const invalidWords = ['FALSIF', 'CONTRAF', 'PARTES', 'PEÇAS', 'LNBF', 'CAPA', 'TELA', 'PELICULA', 'RECEPTOR DE SATELITE', 'IPTV'];

module.exports = class Item {
    constructor(ncm = '', text = '', amount = 0.0, value = 0.0){
        this._ncm = ncm;
        this._text = text;
        this._amount = amount;
        this._value = value;
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
    
        console.log(`NCM: ${this._ncm}, Descr: ${this._text}, NCM válido? ${isNCM}, contém palavra proibida: ${isInvalidWord}`);        
        const answer = validNCM.find( n => this._ncm.startsWith(n)) != undefined && 
            invalidWords.find( word => this._text.includes(word)) == undefined;

        return answer;
    }
}