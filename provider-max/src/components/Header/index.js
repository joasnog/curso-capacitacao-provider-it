import Button from '../Button';
import './style.css';

import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <Link className='logo' to='/'>
                <h1>Provider MAX</h1>
            </Link>
            <Button label='Minha lista' to='/minha-lista' />
        </header>
    );
}