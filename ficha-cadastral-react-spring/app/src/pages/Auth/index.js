import { useState, useContext, useRef } from 'react';

// Context
import { AuthContext } from '../../contexts/auth';

// Primereact
import '/node_modules/primeflex/primeflex.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import { Link } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import Loader from '../../components/Loader';

import background from '../../assets/background.png'

export default function Auth() {
    // Campos Login
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    // Campos Registro
    const [name, setName] = useState('');
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [registrationPass, setRegistrationPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const toast = useRef(null);

    // Visibilidade do popup de cadastro
    const [visible, setVisible] = useState(false);

    // Funções de login e cadastro vindos do contexto/provider
    const { signIn, signInWithGoogle, signUp, authLoading } = useContext(AuthContext);

    // Valida e Faz Login
    async function handleSignIn() {
        if (handleValidate()) {
            await signIn(email, pass).catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: `${err}`, life: 3000 });
            })
        }
    }

    async function handleSignInWithGoogle() {
        await signInWithGoogle().catch((err) => {
            toast.current.show({ severity: 'error', summary: 'Erro', detail: `${err}`, life: 3000 });
        })
    }

    // Valida e Cadastra
    async function handleSignUp(e) {
        e.preventDefault();

        if (handleValidate()) {
            await signUp(name, registrationEmail, registrationPass)
                .catch((err) => {
                    toast.current.show({ severity: 'error', summary: 'Erro', detail: `${err}`, life: 3000 });
                })
        }
    }

    const handleValidate = () => {
        const fields = visible ? [
            { value: name, message: 'Digite o nome do colaborador' },
            { value: registrationEmail, message: 'Digite o seu email' },
            { value: registrationPass, message: 'Digite a sua senha' },
            { value: confirmPass, message: 'Confirme a sua senha' },
        ] : [
            { value: email, message: 'Digite o seu email' },
            { value: pass, message: 'Digite a sua senha' },
        ];

        const invalidField = fields.find(field => !field.value);

        if (invalidField) {
            toast.current.show({ severity: 'warn', summary: 'Alerta', detail: invalidField.message, life: 3000 });
            return false;
        }

        if (registrationPass !== confirmPass && visible) {
            toast.current.show({ severity: 'warn', summary: 'Alerta', detail: 'As senhas não correspondem.', life: 3000 });
            return false;
        }
        return true;
    }

    return (
        <div className="grid grid-nogutter relative">
            <Toast ref={toast} />
            <Dialog header="Cadastro"
                className='absolute overflow-auto top-50 left-50 max-h-full w-screen lg:w-6 md:w-6 transition-all transition-duration-500'
                style={{ transform: 'translate(-50%, -50%)' }}
                visible={visible}
                onHide={() => setVisible(false)}
            >
                <form onSubmit={handleSignUp}>
                    <span className="p-float-label my-5">
                        <InputText
                            id="name"
                            name='name'
                            className='w-full'
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="name">Nome do Colaborador</label>
                    </span>

                    <span className="p-float-label my-5">
                        <InputText id="email" name='email' className='w-full'
                            onChange={(e) => setRegistrationEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </span>

                    <span className="p-float-label mb-5">
                        <Password
                            id='password'
                            name='password'
                            className='w-full'
                            inputStyle={{ width: "100%" }}
                            feedback={false}
                            onChange={(e) => setRegistrationPass(e.target.value)}
                        />

                        <label htmlFor="password">Senha</label>
                    </span>

                    <span className="p-float-label mb-5">
                        <Password
                            id='password'
                            name='password'
                            className={'w-full'}
                            inputStyle={{ width: "100%" }}
                            feedback={false}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                        <label htmlFor="password">Confirme a sua senha</label>
                    </span>

                    <div className='flex justify-content-end flex-wrap'>
                        {
                            authLoading ?
                                <Loader />
                                :
                                <Button
                                    label="Cadastrar"
                                    className='btn-primary'
                                    type='submit'
                                />
                        }

                    </div>
                </form>
            </Dialog>

            <div className='md:col-6 lg:col-6 h-screen flex align-items-center justify-content-center bg-black-100' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }} ></div>


            <div className="col-12 md:col-6 lg:col-6 flex flex-column align-items-center justify-content-center">
                <div className='mx-5'>
                    <div className="text-4xl mb-3">Bem-vindo ao Sistema</div>
                    <span className="text-600 font-light line-height-3">Não possui uma conta?</span>
                    <Link className="font-medium no-underline ml-2 text-blue-500" onClick={() => setVisible(true)}>Criar conta</Link>

                    <span className="p-float-label my-5">
                        <InputText id="email" name='email' className="w-full" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </span>

                    <span className="p-float-label mb-5">
                        <Password id='password' name='password' className='w-full' inputStyle={{ width: "100%" }} feedback={false} onChange={(e) => setPass(e.target.value)} toggleMask></Password>
                        <label htmlFor="password">Senha</label>
                    </span>

                    {
                        authLoading ? <Loader /> :
                            <div>
                                <Button onClick={handleSignIn} label="Entrar" className="w-full btn-primary" />
                                <Button onClick={handleSignInWithGoogle} label="Entrar com Google" icon="pi pi-google" className="w-full btn-tertiary p-button-outlined my-3" />
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}
