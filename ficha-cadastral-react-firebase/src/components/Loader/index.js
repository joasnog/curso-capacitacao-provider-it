import { ProgressSpinner } from 'primereact/progressspinner';

export default function Loader() {
    return (
        <div className='w-full text-center'>
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" />
        </div>
    )
}