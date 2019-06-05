class Colletion {
    constructor(collection = [], title='', includeFlag=false){        
        this._collection = collection;   
        this._title = title;     
        this._includeFlag = includeFlag;
    }

    get title(){
        return this._title;
    }

    get collection(){
        return this._collection;
    }

    set collection(col){
        this._collection = col;
    }

    get includeFlag(){
        return this._includeFlag;
    }

    set includeFlag(flag){
        this._includeFlag = flag;
    }

    add(element){
        this._collection.push(element);
    }

    delete(delElement){
        this._collection = this._collection.filter((element) => element != delElement);
    }

    clear(){
        this._collection.length = 0;
    }
}