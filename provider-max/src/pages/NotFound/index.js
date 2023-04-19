
import './style.css';
import Button from '../../components/Button';

export default function NotFound() {
    return (
        <div className="not-found">
            <h1>OPS, esta página não existe!</h1>
            <Button label='Voltar para a home' to='/' />
        </div>
    );
}


