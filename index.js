var $ = document.querySelector.bind(document);
var $All = document.querySelectorAll.bind(document);

var user = {};

var fields = $All('#form-user-create [name]');

function formatDate(date) {
    let newDate = new Date(date);
    return `${newDate.getDate() + 1}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
}

function addLine(dataUser) {
    console.log(dataUser);
    $('#table-users tbody').innerHTML = `
        <tr>
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${formatDate(dataUser.birth)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
    `;
}

