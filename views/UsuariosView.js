class UsuariosView extends View {

    constructor(ele) {
        super(ele);
    }

    template(model) {
        if(model.usuarios.length > 0) {
            return `
            <table class="table table-striped" id="table-users">
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
                    ${model.usuarios.map((item, idx) => {
                        return `<tr>
                                <td><img src="${item.photo}" alt="Foto ${item.name}" class="img-circle img-sm"></td>
                                <td>${item.name}</td>
                                <td>${item.email}</td>
                                <td>${item.admin  === true ? 'Sim': 'Não'}</td>
                                <td>${DateHelper.dateToText(item.register)}</td>
                                <td>
                                    <button type="button" class="btn btn-primary btn-xs btn-flat" id="btn-editar" onclick="userController.editUser(${idx})">Editar</button>
                                    <button type="button" class="btn btn-danger btn-xs btn-flat" id="btn-excluir" onclick="userController.removeUser(${model.usuarios.indexOf(item)})">Excluir</button>
                                </td>
                            </tr>`
                    }).join(' ')}
                </tbody>
            </table>`
        } else {
            return `
            <table class="table table-striped" id="table-users">
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
                    <tr>
                        <td colspan="6" style="text-align: center;">Não há usuários cadastrados</td>
                    </tr>
                </tbody>
            </table>`;
        }
    }
}