class UserController {

    constructor(formId, tableId) {

        var $ = document.querySelector.bind(document);

        this._form = $(formId);
        this._listaUsuarios = new UsuariosList();
        this._usuariosView = new UsuariosView($(tableId));
        this._msg = $('#msg');
        this._totalPeople = $('#total-people');

        this._onSubmit();
    }

    _getValues() {

        let user = {};

        // Tranformo em um arrai e desmembro os elementos com o spread.
        [...this._form.elements].forEach(function(element, idx) {
            if(element.name == 'gender') {
                if(element.checked) user[element.name] = element.value;
            } else if(element.name === 'admin'){
                user[element.name] = element.checked;
            } else {
                user[element.name] = element.value;
            }
        });
    
        return new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin);
    }

    _onSubmit() {
        this._form.addEventListener("submit", event => {
            event.preventDefault();

            let values = this._getValues();

            values.photo = "";

            this._getPhoto()
                .then(data => {
                    values.photo = data;
                    this._listaUsuarios.adicionar(values);
                    this._msg.style.display = 'none';
                    this._usuariosView.update(this._listaUsuarios);
                    this._totalPeople.textContent = this._listaUsuarios.usuarios.length;
                    this._clearForm();
                })
                .catch(error => console.error(error));

        });
    }

    // Recebo uma promisse
    _getPhoto() {

        return new Promise((resolve, reject) => {
            // Preciso receber uma instaccia de FileReader
            let fileReader = new FileReader();
    
            // Retorno so o elemento foto
            let element = [...this._form.elements].find((ele) => ele.name === 'photo');
            
            let file = element.files[0];
    
            // Ao carregar a foto ele passar por parametro a foto para a função
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (e) => {
                reject(e)
            }
    
            if(file) {
                // Le o base64
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }
        })
    }

    _clearForm() {
        [...this._form.elements].forEach(function(element) {
            element.value = '';
            if(element.name === 'admin') {
                element.checked = false;
            } 
        });
    }

    removeUser(value) {
        this._listaUsuarios.remover(value);
        this._usuariosView.update(this._listaUsuarios);
    }
}