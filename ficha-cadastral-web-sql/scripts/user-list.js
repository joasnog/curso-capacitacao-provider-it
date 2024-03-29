loadTable();

function initDB() {
    // Abre a conexão com o DB
    let db = openDatabase('users_db', '1.0', 'this is a users database in web sql.', 2 * 1024 * 1024);

    // Checar se o db foi criado.
    if (!db) { alert('Erro ao criar o DB'); }

    return db;
}

function loadTable() {
    const db = initDB();

    // Acessa a tabela no DOM
    let tableBody = document.getElementById("table-body");

    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM users', [], (tx, results) => {
            for (let i = 0; i < results.rows.length; i++) {
                const data = results.rows[i];

                // Cria as linhas
                let line = tableBody.insertRow();

                // Povoando a tabela
                for (let j = 0; j < 10; j++) {
                    let cell = line.insertCell();
                    switch (j) {
                        case 0:
                            cell.innerText = data.name;
                            break;
                        case 1:
                            cell.innerText = data.rg;
                            break;
                        case 2:
                            cell.innerText = data.cpf;
                            break;
                        case 3:
                            cell.innerText = data.cep;
                            break;
                        case 4:
                            cell.innerText = data.address;
                            break;
                        case 5:
                            data.complement != ""
                                ?
                                cell.innerText = data.complement
                                :
                                cell.innerText = "Não preenchido";
                            break
                        case 6:
                            cell.innerText = data.number;
                            break;
                        case 7:
                            cell.innerText = data.sex;
                            break;
                        case 8:
                            cell.innerText = data.birthday;
                            break;
                        case 9:
                            cell.innerText = data.marital_status;
                            break;
                    }
                }

                deleteBtn(db, line, data);
            }
        }, null);
    });
}

function deleteBtn(db, line, data) {
    let deleteCell = line.insertCell();

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Excluir";
    deleteButton.setAttribute("data-id", data.id);

    deleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM users WHERE id = ?`,
                [data.id],
                (tx, result) => {
                    // Remove a linha da tabela na posição
                    window.location.reload();
                },
                null
            );
        });
    });
}
