import { ProgressSpinner } from 'primereact/progressspinner';

export function loader() {
    return (<ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" />);
}