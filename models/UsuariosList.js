class UsuariosList {

    constructor() {
        this._usuarios = [];
    }

    adicionar(usuario) {
        this._usuarios.push(usuario);
    }

    get usuarios() {
        return [].concat(this._usuarios);
    }

    remover(user) {
        this._usuarios.splice(user, 1);
    }
}