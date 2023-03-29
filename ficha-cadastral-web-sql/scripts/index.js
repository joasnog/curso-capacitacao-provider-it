// Campos
let fields = document.querySelectorAll("input");

// Obter o banco de dados
const db = initDB();

// Setar data maxima (a atual) para o campo de data de nascimento
// -> toIsoString(): "2023-03-28T20:42:27.023Z"
// -> split('T"): ["2023-03-28","20:42:58.278Z"]
var yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
document.getElementById("birthday").max = yesterday.toISOString().split('T')[0];

// Insere a quantidade de usuários no sistema
db.transaction((tx) => {
    tx.executeSql('SELECT * FROM users', [], (tx, results) => {
        let len = results.rows.length, i;
        msg = "<p>Usuários Cadastrados no Sistema: " + len + "</p>";
        document.querySelector('#bottom-message').innerHTML += msg;
    }, null);
});

// Aplicar Masks e Validar
let alertaAtivo = false;
fields.forEach((field) => {
    if (field.id === "cpf") {
        field.addEventListener("keyup", (ev) => {
            let cpf = ev.target.value;
            cpf = cpf.replace(/\D/g, ""); // /\D/g remove todos os caracteres que não são dígitos
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // /(\d{3})(\d)/ Seleciona os 3 primeiros dígitos e "$1.$2" adiciona um ponto entre eles
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Aqui pega os próximos 3 dígitos e adiciona um ponto entre eles
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Aqui pega os próximos 3 e os 2 ultimos e adiciona um hifen.
            ev.target.value = cpf;
        });
    }

    if (field.id === "cep") {
        field.addEventListener("keyup", (ev) => {
            // 65907-320
            let cep = ev.target.value;
            cep = cep.replace(/\D/g, '')
            cep = cep.replace(/(\d{5})(\d)/, '$1-$2')
            if (cep.length === 9) {
                getCepData(cep);
            }
            ev.target.value = cep;
        });
    }

    if (field.id === "rg") {
        field.addEventListener("keyup", (ev) => {
            let rg = ev.target.value;
            rg = rg.replace(/\D/g, ""); // Remove tudo que não é número \D procura tudo que nao é digito com o g (global)
            ev.target.value = rg;
        });
    }

    if (field.id === "name") {
        field.addEventListener("keyup", (ev) => {
            let name = ev.target.value;
            name = name.replace(/[0-9]/g, ''); // Remove todos os numeros.
            ev.target.value = name;
        });
    }

    if (field.id === "name") {
        field.addEventListener("blur", (ev) => {
            if (!validateName(field.value) && !alertaAtivo) {
                return showAlert("Preencha o seu nome completo!");
            }

        });
    }

    if (field.id === "cpf") {
        field.addEventListener("blur", (ev) => {
            if (!validateCPF(field.value) && !alertaAtivo) {
                return showAlert("CPF Inválido");
            }

        });
    }

    if (field.id === "number") {
        field.addEventListener("keyup", (ev) => {
            let number = ev.target.value;
            number = number.replace(/\D/g, ""); // Remove tudo que não é número \D procura tudo que nao é digito com o g (global)
            ev.target.value = number;
        });
    }
});

function showAlert(message) {
    if (alertaAtivo) { return; }

    alert(message);

    alertaAtivo = true;

    setTimeout(() => {
        alertaAtivo = false;
    }, 1000);
}

// Algoritmo de validação de CPF
function validateCPF(cpf) {
    let isValid = false;
    let cleanedCpf = cpf.replaceAll(".", "").replaceAll("-", "");
    const digitoVerificador = cleanedCpf[9] + cleanedCpf[10];

    // Validação do primeiro digito
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cleanedCpf[i]) * (10 - i);
    }

    // Multiplica por 10 e divide por 11 e pega o resto
    let resto = ((soma * 10) % 11);

    // Se o resto for 10 consideramos como 0
    resto == 10 ? resto = 0 : resto = resto;

    // O resto tem que ser igual o digito verificador 1, senao for o CPF é inválido
    if (resto.toString() === digitoVerificador[0]) {
        // Validação do segundo dígito
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cleanedCpf[i]) * (11 - i);
        }

        resto = ((soma * 10) % 11);

        // O resto tem que ser igual o digito verificador 2, senao for o CPF é inválido
        if (resto.toString() === digitoVerificador[1]) {
            isValid = true;
        }
    }

    return isValid;
}

function validateName(name) {
    let names = name.split(" ");
    return names.length >= 2;
}

function initDB() {
    // Abre a conexão com o DB
    let db = openDatabase('users_db', '1.0', 'this is a users database in web sql.', 2 * 1024 * 1024);

    // Checar se o db foi criado.
    if (!db) { alert('Erro ao criar o DB'); }

    return db;
}

// Requisição à API do ViaCEP
function getCepData(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    let addressField = document.getElementById("address");

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (!data.erro) {
                fields.forEach((field) => {
                    if (field.id === 'address') {
                        field.value = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
                    }

                    if (field.id === 'complement') {
                        field.value = data.complemento;
                    }
                })

                console.log(data);
            }
        })
        .catch((error) => console.error(error));
}

// Limpar os dados do Formulário
function clearData() {
    document.querySelector('button[type="reset"]').click();
}

// Função utilitária de formatação de datas
function formatDate(date) {
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    return `${day}/${month}/${year}`;
}

// Obter os valores do formulário
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

// Salvar no DB
function saveData() {
    const allFilled = document.getElementById('form').checkValidity();

    if (allFilled) {
        event.preventDefault();

        // Obter dados
        const data = getData();

        console.log(data);

        if (validateCPF(data.cpf) && validateName(data.name)) {
            // Criar as tabelas e insere os dados
            db.transaction((tx) => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, rg TEXT, cpf TEXT, cep TEXT, address TEXT, complement TEXT, number TEXT, sex TEXT, birthday TEXT, marital_status TEXT)');
                tx.executeSql('INSERT INTO users (name, rg, cpf, cep, address, complement, number, sex, birthday, marital_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.name, data.rg, data.cpf, data.cep, data.address, data.complement, data.number, data.sex, data.birthday, data.marital_status], (tx, result) => {
                    console.log('Usuário inserido com sucesso!');
                    clearData();
                    window.location.href = 'user-list.html';
                }, (tx, err) => {
                    alert('Ocorreu o seguinte erro: ' + err.message);
                });
            });
        } else {
            alert("Campo nome e/ou CPF estão incorretos!");
        }

    }
}







