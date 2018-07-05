class MensagemView extends View {

    constructor(ele) {
        super(ele);
    }

    template(model) {
        return model.mensagem ? `<p class="mensagem">${model.mensagem}</p>` : `<p></p>`
    }
}