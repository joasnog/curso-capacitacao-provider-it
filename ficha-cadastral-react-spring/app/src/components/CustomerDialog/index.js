import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { RadioButton } from 'primereact/radiobutton';
import { useState } from 'react';
import { ConvertStringDateToIso8601, DateToString, StringToDate } from '../../utils/DateUtils';
import { ValidateCPF } from '../../utils/ValidateCpf';
import api from '../../services/api';
import viaCepApi from '../../utils/ViaCepApi';

export default function CustomerDialog({ visible, setDialogVisible, onHide, toast, isEditing, customerData, getCustomers }) {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({});
    const [gender, setGender] = useState('');
    const [customGender, setCustomGender] = useState('');
    const [formErrors, setFormErrors] = useState({});

    function handleDataChange(e) {
        const { name, value } = e.target;

        const updatedFormData = {
            ...formData,
            [name]: value,
            createdBy: user.name
        };

        let updatedFormErrors = {
            ...formErrors,
            [name]: false
        };

        if (gender === 'Custom') {
            updatedFormData.gender = customGender;
        } else {
            updatedFormData.gender = gender;
        }

        if (name === 'cep') {
            const cleanedCEP = value.replaceAll(".", "").replaceAll("-", "").replaceAll("_", "");
            if (cleanedCEP.length === 8) {
                viaCepApi.get(`/${cleanedCEP}/json`)
                    .then((result) => {
                        const data = result.data;
                        setFormData({
                            ...formData,
                            cep: data.cep,
                            address: `${data.logradouro}, ${data.bairro}, ${data.localidade}/${data.uf}`,
                            complement: data.complement ?? '',
                        });
                    }).catch((err) => {
                        toast.current.show({ severity: 'err', summary: 'Erro', detail: `Erro ao buscar o CEP.`, life: 3000 });
                    })
            }
        }

        setFormData(updatedFormData);
        setFormErrors(updatedFormErrors);
    }

    const footerContent = (
        <Button label="Salvar" className='btn-primary' onClick={handleSubmitData} />
    );

    function handleValidateForm() {
        const requiredFields = ['name', 'cpf', 'phone', 'birthday', 'cep', 'address', 'number', 'gender'];
        const errors = requiredFields.reduce((acc, field) => {
            if (!formData[field]) {
                acc[field] = true;
            }

            if (formData['name']) {
                let names = formData['name'].split(" ");
                if (names.length < 2) {
                    acc['name'] = true;
                    toast.current.show({ severity: 'error', summary: 'Erro', detail: `Por Favor, digite nome e sobrenome.`, life: 3000 });
                }
            }

            if (formData['cpf']) {
                const cleanedCpf = formData['cpf'].replaceAll(".", "").replaceAll("-", "").replaceAll("_", "");

                if (cleanedCpf.length === 11) {
                    const isValid = ValidateCPF(cleanedCpf);

                    if (!isValid) {
                        acc['cpf'] = true;
                        toast.current.show({ severity: 'error', summary: 'Erro', detail: `Este CPF não é válido.`, life: 3000 });
                    }
                }

            }

            if (formData['birthday']) {
                const minDate = new Date('1950-01-01');
                const maxDate = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)
                const inputDate = StringToDate(formData['birthday']);

                const [day, month] = formData['birthday'].split('/');

                if (!(inputDate >= minDate && inputDate <= maxDate)) {
                    acc['birthday'] = true;
                    toast.current.show({ severity: 'error', summary: 'Erro', detail: `Esta data não é válida.`, life: 3000 });
                }

                if (day < 1 || day > 31 || month < 1 || month > 12) {
                    acc['birthday'] = true;
                    toast.current.show({ severity: 'error', summary: 'Erro', detail: `Esta data não é válida.`, life: 3000 });
                }


            }

            return acc;
        }, {});

        setFormErrors(errors);

        // Retorna um array com os valores que são true pro erro booleano indicando se há erros
        return Object.values(errors).some(error => error);
    }

    async function handleSubmitData() {
        if (gender === 'Custom') {
            formData.gender = customGender;
        } else {
            formData.gender = gender;
        }

        setFormData(formData);


        const hasErrors = handleValidateForm();

        // Verifica se há erros no formulário
        if (hasErrors) {
            setTimeout(() => {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: `Preencha todos os campos corretamente.`, life: 3000 });
            }, 300)
        } else {
            if (formData.id) {
                // Edita um usuário
                // Converte data para o formato que a API Spring aceite
                formData.birthday = ConvertStringDateToIso8601(formData.birthday);

                await api.put(`/customers/${formData.id}`, formData)
                    .then((response) => {
                        setDialogVisible(false);
                        setFormData({});
                        getCustomers();
                        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: `Cliente editado com sucesso.`, life: 3000 });
                    }).catch((err) => {
                        console.log(err);
                        toast.current.show({ severity: 'err', summary: 'Erro', detail: `Ocorreu um erro.`, life: 3000 });
                    });
            }
            else {
                // Cadastra um usuário
                // Converte data para o formato que a API Spring aceite
                formData.birthday = ConvertStringDateToIso8601(formData.birthday);

                await api.post(`/customers`, formData)
                    .then((response) => {
                        setDialogVisible(false);
                        setFormData({});
                        getCustomers();
                        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: `Cliente cadastrado com sucesso.`, life: 3000 });
                    }).catch((err) => {
                        toast.current.show({ severity: 'err', summary: 'Erro', detail: `Ocorreu um erro.`, life: 3000 });
                    });
            }
        }
    }

    return (
        <Dialog
            header="Cadastro de cliente"
            visible={visible}
            position="bottom"
            style={{ width: '50vw' }}
            onHide={() => {
                onHide();
                setFormData({});
                setFormErrors({});
            }}
            draggable={false}
            resizable={false}
            footer={footerContent}
            onShow={() => {
                if (isEditing) {
                    if (customerData.gender !== "Masculino" && customerData.gender !== "Feminino") {
                        setGender("Custom");
                    } else {
                        setGender(customerData.gender);
                    }
                    setFormData({
                        ...customerData,
                        birthday: DateToString(customerData.birthday),
                    });
                } else {
                    setFormData({});
                }
            }}
        >
            <form>
                <span className="p-float-label my-5">
                    <InputText label="Nome" id="name" name="name" value={formData.name} onChange={handleDataChange} className={`w-full ${formErrors.name ? 'p-invalid' : ''}`} />
                    <label htmlFor='name'>Nome</label>
                </span>

                <span className="p-float-label my-5">
                    <InputMask id="cpf" name='cpf' mask="999.999.999-99" value={formData.cpf} onChange={handleDataChange} className={`w-full ${formErrors.cpf ? 'p-invalid' : ''}`} />
                    <label htmlFor='cpf'>CPF</label>
                </span>

                <span>Gênero</span>
                <div className="flex flex-wrap gap-3 justify-content-around my-5">
                    <div className="flex align-items-center">
                        <RadioButton inputId="male" name="male" value="Masculino" className={`${formErrors.gender ? 'p-invalid' : ''}`} onChange={(e) => setGender(e.value)} checked={gender === 'Masculino'} />
                        <label htmlFor="male" className="ml-2">Masculino</label>
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="female" name="female" defaultValue={customerData.gender} value="Feminino" className={`${formErrors.gender ? 'p-invalid' : ''}`} onChange={(e) => setGender(e.value)} checked={gender === 'Feminino'} />
                        <label htmlFor="female" className="ml-2">Feminino</label>
                    </div>
                    <div className="flex align-items-center ">
                        <RadioButton inputId="custom" name="custom" defaultValue={customerData.gender} value="Custom" className={`${formErrors.gender ? 'p-invalid' : ''}`} onChange={(e) => setGender(e.value)} checked={gender === 'Custom'} />
                        <label htmlFor="custom" className="ml-2">Personalizado</label>
                    </div>
                </div>

                {gender === 'Custom' ?
                    <span className="p-float-label my-5">
                        <InputText id="gender" name='gender' defaultValue={customerData.gender} className='w-full' onChange={(e) => setCustomGender(e.target.value)} />
                        <label htmlFor="gender">Gênero</label>
                    </span>
                    : null
                }

                <span className="p-float-label my-5">
                    <InputMask id="phone" name='phone' mask="(99) 99999-9999" value={formData.phone} onChange={handleDataChange} className={`w-full ${formErrors.phone ? 'p-invalid' : ''}`} />
                    <label htmlFor='phone'>Telefone</label>
                </span>

                <span className="p-float-label my-5">
                    <InputMask id="birthday" name='birthday' mask="99/99/9999" value={formData.birthday} onChange={handleDataChange} className={`w-full ${formErrors.birthday ? 'p-invalid' : ''}`} />
                    <label htmlFor='birthday'>Data de Nascimento</label>
                </span>

                <span className="p-float-label my-5">
                    <InputMask id="cep" name='cep' mask="99999-999" value={formData.cep} onChange={handleDataChange} className={`w-full ${formErrors.cep ? 'p-invalid' : ''}`} />
                    <label htmlFor='cep'>CEP</label>
                </span>

                <span className="p-float-label my-5">
                    <InputText id="address" name='address' value={formData.address} onChange={handleDataChange} className={`w-full ${formErrors.address ? 'p-invalid' : ''}`} />
                    <label htmlFor='address'>Endereço</label>
                </span>

                <div className='w-full flex justify-content-between my-5'>
                    <span className="p-float-label ">
                        <InputText id="number" name='number' value={formData.number} onChange={handleDataChange} className={`${formErrors.number ? 'p-invalid' : ''}`} />
                        <label htmlFor="number">Número</label>
                    </span>

                    <span className="p-float-label ">
                        <InputText id="complement" name='complement' value={formData.complement} onChange={handleDataChange} />
                        <label htmlFor="complement">Complemento</label>
                    </span>
                </div>


            </form>
        </Dialog>
    )
}