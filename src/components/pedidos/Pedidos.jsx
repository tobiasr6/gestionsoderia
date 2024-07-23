import './pedidos.css'
import { useNavigate } from 'react-router-dom';

export function Pedidos (){

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/inicio');
    };


    return(
        <div className="pedidos">
            <h1>Pedidos</h1>
            <button onClick={handleGoBack} className="btn-go-back">
                Volver al Inicio
            </button>
        </div>
    )
}