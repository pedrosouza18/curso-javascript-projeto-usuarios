class View {

    constructor(ele) {
        this._element = ele;
    }

    template() {
        throw new Error('O método template precisa ser criado!');
    }

    update(model) {
        this._element.innerHTML = this.template(model);
    }
}