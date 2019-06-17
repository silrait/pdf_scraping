class Controller {
    constructor(){
        const $ = document.querySelector.bind(document);
        this._fileUploadController =  new FileUploadController($('#file-field'));
        this._ncmModel = new NCM();
        this._ncmController = new ChipController(this._ncmModel,  $("#ncm-collection"));
        this._produtoModel = new Produto();
        this._produtoController = new ChipController(this._produtoModel, $('#produto-collection'));        

        $('#check-btn').addEventListener('click', () => {
            this.processarArquivo();
        });        
    }

    async processarArquivo(){
        let api = new PdfScraperAPI();

        try{
            const csvData = await api.scrape({
                binary: this._fileUploadController.pdfBinary,
                options: {
                    ncm: this._ncmModel.data,
                    produto: this._produtoModel.data
                }
            });
            console.log(csvData);
            const url = window.URL.createObjectURL(new Blob([csvData]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'result.csv');
            document.body.appendChild(link);
            link.click();
        } catch(error){
            console.log(error);
        }        
    }
}