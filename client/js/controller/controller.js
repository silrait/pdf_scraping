class Controller {
    constructor(){
        const $ = document.querySelector.bind(document);
        this._fileUploadController =  new FileUploadController($('#file-field'));
        this._ncmController = new ChipController(new NCM(),  $("#ncm-collection"));
        this._produtoController = new ChipController(new Produto(), $('#produto-collection'));
        $('#check-btn').addEventListener('click', () => {
            console.log(this);
        });        
    }

    clearChips(){
        console.log(event);
    }
}