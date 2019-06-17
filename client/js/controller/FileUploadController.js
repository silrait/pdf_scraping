class FileUploadController {
    constructor(element){
        this._element = element;
        this._view = new FileUploadView(element);
        this._loading = false;        
        this._pdfBinary = null;

        this._viewUpdate();

        this._inputBtn = element.getElementsByClassName("pdf-file")[0];
        this._inputBtn.addEventListener('change', (event) =>{
            this._carregarArquivo(event.target.files);
        });
    }

    get pdfBinary(){
        return Object.freeze(this._pdfBinary);
    }

    _viewUpdate(){
        this._view.update(this._model);
    }

    _carregarArquivo(files) {
        this._loading = true;
        console.log(files);
        let fileContent = '';
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this._pdfBinary = reader.result;
                this._loading = false;
            };
            reader.readAsBinaryString(file);
        }
    }
}