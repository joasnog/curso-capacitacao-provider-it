
import '/node_modules/primeflex/primeflex.css';
import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { auth } from '../../firebase/firebaseConnection';
import { updateProfile } from "firebase/auth";
import { useEffect, useState, useRef } from 'react';
import { loader } from '../../components/Loader';
import { Toast } from 'primereact/toast';

export default function Profile() {
    const { displayName } = auth.currentUser;
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        setName(displayName);
    }, [displayName])

    function changeName() {
        if (name) {
            setLoading(true);
            updateProfile(auth.currentUser, {
                'displayName': name,
            }).then((_) => {
                toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Nome atualizado com sucesso', life: 3000 });
            }).catch((_) => {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro inesperado', life: 3000 });
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    return (
        <>
            <Toast ref={toast} />
            <div flex-wrap justify-content-evenly align-items-center h-screen w-full>
                <div className='text-center'>
                    <h1>Perfil</h1>
                    <div className='flex flex-column justify-content-center align-items-center'>
                        <div className='p-float-label mb 3 my-2'>
                            <InputText
                                id='input-name'
                                defaultValue={name}
                                className="p-inputtext-lg"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor='input-name'>Como devemos te chamar?</label>
                        </div>

                        {
                            loading ? loader() : <Button label="Salvar" rounded icon="pi pi-save" size="small" onClick={changeName} />
                        }
                    </div>

                </div>

            </div>
        </>
    );
}