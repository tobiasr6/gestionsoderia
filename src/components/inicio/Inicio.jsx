import './inicio.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Inicio({ user, setUser }) {
    const [totalPedidos, setTotalPedidos] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const savedTotalPedidos = localStorage.getItem(`totalPedidos_${user}`);
            setTotalPedidos(savedTotalPedidos ? parseInt(savedTotalPedidos, 10) : 0);
        }
    }, [user]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };

    return (
        <div className="inicio">
            <h1>Bienvenido</h1>
            <h2>{user}</h2>
            <button onClick={handleLogout}>Cerrar sesión</button>

            <div className="boxEstadisticas">
                <div onClick={() => navigate('/clientes')} className="estadistica clientes">
                    Clientes
                </div>
                <div className="estadistica entregas">
                    Entregas
                </div>
                <div className="estadistica zonas">
                    Zonas
                </div>
                <div className="estadistica pedidos">
                    Pedidos: {totalPedidos}
                </div>
            </div>
        </div>
    );
}
