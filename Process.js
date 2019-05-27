module.exports = class Process {
    constructor(number, items = [], value = 0){
        this._number = this._formatProcessNumber(number);
        this._items = items;
        this._value = 0;
    }

    get number(){
        return this._number;
    }

    get items(){
        return Object.freeze(this._items);
    }

    get itemsCount(){
        return this._items.length;
    }

    set value(value){
        this._value = value;
    }

    addItem(item){
        this._items.push(item);
    }

    _formatProcessNumber(number){
        return `${number.substring(0,5)}.${number.substring(5,8)}.${number.substring(8,11)}/${number.substring(11,15)}-${number.substring(15)}`
    }

    toString(){
        return  `Process: ${this._number}\nNº of Items: ${this._items.length}
Items: \n${this._items.map(item => item.toString()).join('\n')}
Value: ${this._value.toFixed(2)}\n`;
    }
}