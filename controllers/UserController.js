class UserController {

    constructor(formId, tableId) {

        var $ = document.querySelector.bind(document);

        this._form = $(formId);
        this._table = $(tableId);

        this.onSubmit();
    }

    getValues() {

        let user = {};

        Array.from(this._form.elements).forEach(function(element, idx) {
            if(element.name == 'gender') {
                if(element.checked) user[element.name] = element.value;
            } else {
                user[element.name] = element.value;
            } 
        });
    
        return new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin);
    }

    onSubmit() {
        this._form.addEventListener("submit", event => {
            event.preventDefault();
            this.addLine(this.getValues());
        });
    }

    addLine(dataUser) {
        this._table.innerHTML = `
        <tr>
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
    `;
    }
}