class UsuariosView extends View {

    constructor(ele) {
        super(ele);
    }

    template(model) {
        return `<table class="table table-striped" id="table-users">
            <thead>
                <tr>
                    <th style="width: 10px">Foto</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Admin</th>
                    <th>Criado em</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${model.usuarios.map(item => {
                    return `<tr>
                            <td><img src="${item.photo}" alt="Foto ${item.name}" class="img-circle img-sm"></td>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.admin}</td>
                            <td>${item.birth}</td>
                            <td>
                                <button type="button" class="btn btn-primary btn-xs btn-flat" id="btn-editar">Editar</button>
                                <button type="button" class="btn btn-danger btn-xs btn-flat" id="btn-excluir" onclick="userController.removeUser(${model.usuarios.indexOf(item)})">Excluir</button>
                            </td>
                        </tr>`
                }).join(' ')}
            </tbody>
        </table>`
    }
}