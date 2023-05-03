// Styles
import Chat from '../../img/chat.png';

import '/node_modules/primeflex/primeflex.css';
import './welcome.css';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';

// Firebase Métodos
import { signInWithRedirect, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebaseConnection';
import { useRef, useState } from 'react';
import { AuthExceptions } from '../../firebase/exceptions/authExceptions';
import { loader } from '../../components/Loader';

export default function Welcome() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [authType, setAuthType] = useState('Login')
    const toast = useRef(null);

    function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }

    function authentication() {
        if (authType === 'Login' && email && pass) {
            setLoading(true);

            signInWithEmailAndPassword(auth, email, pass).catch((e) => {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Email/Senha incorretos', life: 3000 });
            }).finally(() => {
                setLoading(false);
            });

        } else if (authType === 'Cadastrar' && email && pass) {
            setLoading(true);

            if (pass !== confirmPass) {
                setLoading(false);
                return toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Senhas não coincidem', life: 3000 });
            }

            createUserWithEmailAndPassword(auth, email, pass).catch((e) => {
                toast.current.show({ severity: 'info', summary: 'Info', detail: AuthExceptions(e.code), life: 3000 });
            }).finally(() => {
                setLoading(false);
            });;
        } else {
            toast.current.show({ severity: 'info', summary: 'Info', detail: 'Preencha todos os campos', life: 3000 });
        }
    }

    return (
        <>
            <Toast ref={toast} />
            <div className='flex flex-wrap justify-content-evenly align-items-center h-screen mx-6'>
                <div className='text-center'>
                    <img src={Chat} className="chat-img" alt="Chat" />
                    <h1>Boas-Vindas ao Provider Chat</h1>
                    <span className='description'>O seu chat rápido e fácil!</span>
                </div>

                <div className='flex flex-column justify-content-center align-items-center'>
                    <h1 className='text-900'>{authType}</h1>

                    <div className='p-float-label mb 3 my-2'>
                        <InputText id='input-email' onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor='input-email'>Email</label>
                    </div>

                    <div className='p-float-label mb 3 my-2'>
                        <Password feedback={false} id='input-password' onChange={(e) => setPass(e.target.value)} />
                        <label htmlFor='input-password'>Senha</label>
                    </div>

                    {authType === 'Cadastrar' ?
                        <div className='p-float-label mb 3 my-2'>
                            <Password feedback={false} id='input-confirm' onChange={(e) => setConfirmPass(e.target.value)} />
                            <label htmlFor='input-confirm'>Confirmar senha</label>
                        </div>

                        : null
                    }

                    <div className='my-2'>
                        {loading ? loader() : <Button label={authType} rounded size="small" onClick={authentication} />}

                    </div>

                    <Divider layout="horizontal">   </Divider>


                    <Button label="Login com Google" rounded icon="pi pi-google" size="small" onClick={loginWithGoogle} />

                    <span className='my-5' onClick={() => authType === 'Cadastrar' ? setAuthType('Login') : setAuthType('Cadastrar')} style={{ cursor: 'pointer' }}>
                        {authType === 'Cadastrar' ? 'Já possui uma conta? Entrar' : 'Não possui uma conta? Cadastre-se'}
                    </span>

                </div>
            </div >
        </>
    );
}