// Setar data maxima (a atual) para o campo de data de nascimento
document.getElementById("birthday").max = new Date().toISOString().split('T')[0];

// Obter o banco de dados
const db = initDB();

db.transaction((tx) => {
    tx.executeSql('SELECT * FROM users', [], (tx, results) => {
        let len = results.rows.length, i;
        msg = "<p>Usuários Cadastrados no Sistema: " + len + "</p>";
        document.querySelector('#bottom-message').innerHTML += msg;
    }, null);
});

// Campos
let fields = document.querySelectorAll("input");


function getCepData(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    let addressField = document.getElementById("address");

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (!data.erro) {
                addressField.value = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`
            }
        })
        .catch((error) => console.error(error));
}

function clearData() {
    document.querySelector('button[type="reset"]').click();
}

// Aplicar Masks
fields.forEach((field) => {
    if (field.id === "cpf") {
        field.addEventListener("keyup", (ev) => {
            let cpf = ev.target.value;
            cpf = cpf.replace(/\D/g, "");
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            ev.target.value = cpf;
        });
    }

    if (field.id === "cep") {
        field.addEventListener("keyup", (ev) => {
            let cep = ev.target.value;
            cep = cep.replace(/\D/g, '')
            cep = cep.replace(/(\d{5})(\d)/, '$1-$2')
            if (cep.length === 9) {
                getCepData(cep);
            }
            ev.target.value = cep;
        });
    }
});

function formatDate(date) {
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    return `${day}/${month}/${year}`;
}

function getData() {
    let data = {};

    fields.forEach((field) => {
        if (field.checked) {
            data["marital_status"] = field.value;
        } else {
            if (field.type === "text") {
                data[field.id] = field.value;
            } else if (field.type === "date") {
                data[field.id] = formatDate(field.value);
            }
        }
    });

    data["sex"] = document.getElementById("sex").value;

    return data;
}

function initDB() {
    // Abre a conexão com o DB
    let db = openDatabase('users_db', '1.0', 'this is a users database in web sql.', 2 * 1024 * 1024);

    // Checar se o db foi criado.
    if (!db) { alert('Erro ao criar o DB'); }

    return db;
}

function saveData() {
    const isValid = document.getElementById('form').checkValidity();

    if (isValid) {
        event.preventDefault();

        // Obter dados
        const data = getData();

        console.log(data);

        // Criar as tabelas e insere os dados
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, rg TEXT, cpf TEXT, cep TEXT, address TEXT, sex TEXT, birthday TEXT, marital_status TEXT)');
            tx.executeSql('INSERT INTO users (name, rg, cpf, cep, address, sex, birthday, marital_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.name, data.rg, data.cpf, data.cep, data.address, data.sex, data.birthday, data.marital_status], (tx, result) => {
                console.log('Usuário inserido com sucesso!');
                clearData();
                window.location.href = 'user-list.html';
            }, (tx, err) => {
                console.log('Ocorreu o seguinte erro: ' + err.message);
            });
        });

    }
}







