class UserController {

    constructor(formId, tableId) {

        var $ = document.querySelector.bind(document);

        this._form = $(formId);
        this._listaUsuarios = new UsuariosList();
        this._usuariosView = new UsuariosView($(tableId));
        this._msg = $('#msg');
        this._totalPeople = $('#total-people');
        this._totalAdmin = $('#total-admin');

        this._usuariosView.update(this._listaUsuarios);

        this._onSubmit();
    }

    _getValues() {

        let user = {};

        // Tranformo em um arrai e desmembro os elementos com o spread.
        [...this._form.elements].forEach(function(element, idx) {
            
            if(['name', 'email', 'password', 'birth',' country', 'photo'].indexOf(element.name) > -1 && !element.value) {
                element.parentElement.classList.add('has-error');
                return; 
            } else {
                if(element.name == 'name') {
                    if(this._listaUsuarios.usuarios > 0) {
                        let sameName = this._listaUsuarios.usuarios.find(value => {
                            return element.value.split(' ').join('').toLowerCase() === value.split(' ').join('').toLowerCase();
                        });
                        console.log(sameName);
                    }
                }
                if(element.name == 'gender') {
                    if(element.checked) user[element.name] = element.value;
                } else if(element.name === 'admin'){
                    user[element.name] = element.checked;
                } else if(element.name === 'birth') {
                    user[element.name] = DateHelper.textToDate(element.value);
                } else {
                    user[element.name] = element.value;
                }
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
                    this._usuariosView.update(this._listaUsuarios);
                    this._updateCount();
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
        this._updateCount();
        
    }

    _updateCount() {
        this._totalPeople.textContent = this._listaUsuarios.usuarios.length;
        this._totalAdmin.textContent = this._listaUsuarios.usuarios.filter(element => element.admin).length;        
    }

}