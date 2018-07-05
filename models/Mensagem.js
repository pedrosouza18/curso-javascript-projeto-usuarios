class Mensagem {

    constructor(mensagem = ''){
        this._mensagem = mensagem;
    }

    get mensagem() {
        return this._mensagem;
    }

    set mensagem(mensagem) {
        this._mensagem = mensagem;
    }
}