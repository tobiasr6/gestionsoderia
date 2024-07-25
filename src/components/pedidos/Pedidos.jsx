import { useEffect, useState } from 'react';
import './pedidos.css'
import { useNavigate } from 'react-router-dom';

export function Pedidos ( { user } ){
    const [clientes, setClientes] = useState(() => {
        const savedClientes = localStorage.getItem(`clientes_${user}`);
        return savedClientes ? JSON.parse(savedClientes) : [];
    });

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/inicio');
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem(`clientes_${user}`, JSON.stringify(clientes));
        }
    }, [clientes, user]);

    return(
        <div className="pedidos">
            <h1>Pedidos</h1>
            <button onClick={handleGoBack} className="btn-go-back">
                Volver al Inicio
            </button>

            <div className="lista-clientes">
                {clientes.map((cliente, index) => (
                    <div key={index} className="cliente">
                        <h2>{cliente.pedido}</h2>
                        <p>Cliente:{cliente.nombre}</p>
                        <p>Dia de entrega: {cliente.dia}</p>
                        <p>Observaciones: {cliente.observaciones}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}