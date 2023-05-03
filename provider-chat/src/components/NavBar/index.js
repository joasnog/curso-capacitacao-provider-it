
import React, { useRef } from 'react';
import { auth } from '../../firebase/firebaseConnection';

import 'primeicons/primeicons.css';
import './navbar.css';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { Link, useNavigate } from "react-router-dom"

export default function NavBar() {
    const navigator = useNavigate();

    const menu = useRef(null);
    const toast = useRef(null);
    const items = [
        {
            label: 'Perfil',
            icon: 'pi pi-fw pi-user',
            command: () => {
                navigator('/profile', { replace: true });
            }
        },
        {
            label: 'Sair',
            icon: 'pi pi-fw pi-times',
            command: () => {
                logout();
            }
        }
    ];

    function logout() {
        navigator('/', { replace: true });
        auth.signOut();
    }

    return (
        <nav className="nav-bar">
            <Link to='/'>
                <h1>Provider Chat</h1>
            </Link>

            <Toast ref={toast}></Toast>
            <Menu model={items} popup ref={menu} />
            <Button label="Menu" icon="pi pi-bars" onClick={(e) => menu.current.toggle(e)} />
        </nav >
    );
}