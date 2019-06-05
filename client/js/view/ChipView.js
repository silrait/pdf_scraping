class ChipView extends View {
    constructor(elemento) {
        super(elemento);
    }

    _template(model) {
        return `
            <div class="card">
                <div class="card-content">
                    <span class="card-title">${model.title}</span>
                    <div class="chips"></div>
                </div>
                <div class="card-action">
                    <div class="switch col s7 m7">
                        <label>
                            Excluir
                            <input class="query-switch" type="checkbox">
                            <span class="lever"></span>
                            Incluir
                        </label>
                    </div>
                    <a class="waves-effect waves-light btn clear-button">Limpar</a>
                </div>
            </div>`;
    }
}
