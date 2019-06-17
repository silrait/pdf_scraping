class ChipController {
    constructor(model, element){
        this._model = model;        
        this._element = element;
        this._view = new ChipView(element);

        this._viewUpdate();

        this._clearBtn = element.getElementsByClassName("clear-button")[0];
        this._clearBtn.addEventListener('click', (ev) => {
            this._model.clear();
            this._chipInstance.chipsData.length = 0;
            this._resetChip();            
        });

        this._querySwitch =  element.getElementsByClassName("query-switch")[0];
        this._querySwitch.addEventListener('change', (ev) => {
            this._model.includeFlag = this._querySwitch.checked;
        });

        this._chipInstance = this._initChip();
    }

    _viewUpdate(){
        this._view.update(this._model);
    }

    _resetChip(){
        this._viewUpdate();
        this._chipInstance = this._initChip();
    }

    _initChip(){
        let chips = this._element.querySelectorAll('.chips');
        return M.Chips.init(chips, {
            data: this._modelToChip(),
            onChipAdd: (c) => {
                this._model.collection = this._chipToModel();
            },
            onChipDelete: (c) => {
                this._model.collection = this._chipToModel();
            }
        })[0];
    }

    _modelToChip(){
        return this._model.collection.map(value => {
            return {tag: value}
        });
    }

    _chipToModel(){
        return this._chipInstance.chipsData.map(chip => chip.tag);
    }
}