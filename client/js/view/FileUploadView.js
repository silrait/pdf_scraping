class FileUploadView extends View {
    constructor(elemento) {
        super(elemento);
    }

    _template(model) {
        return `
        <div class="file-field">
            <div class="btn">
                <span>Arquivo</span>
                <input class="pdf-file" type="file" accept="text/csv">
            </div>
            <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
            </div>
        </div>`;
    }
}

