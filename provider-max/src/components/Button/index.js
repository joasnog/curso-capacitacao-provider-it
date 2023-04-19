import { Link } from "react-router-dom";
import './style.css';

export default function Button({ label, to, target, onClick }) {
    return (
        <Link className='btn' to={to} target={target} onClick={onClick}>
            {label}
        </Link>
    );
}