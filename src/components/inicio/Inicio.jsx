import './inicio.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Inicio({ user, setUser }) {
    const [totalPedidos, setTotalPedidos] = useState(0);
    const [totalClientes, setTotalClientes] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const savedTotalPedidos = localStorage.getItem(`totalPedidos_${user}`);
            setTotalPedidos(savedTotalPedidos ? parseInt(savedTotalPedidos, 10) : 0);
        }
    }, [user]);

    useEffect(() => {
        const savedClientes = localStorage.getItem(`clientes_${user}`);
        if (savedClientes) {
            setTotalClientes(JSON.parse(savedClientes).length);
        }
    }, [user]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={`inicio ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <button className="menu-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <button className="close-sidebar" onClick={toggleSidebar}>
                    &times;
                </button>
                <nav>
                    <div onClick={() => navigate('/clientes')}>Clientes</div>
                    <div onClick={() => navigate('/entregas')}>Entregas</div>
                    <div onClick={() => navigate('/zonas')}>Zonas</div>
                    <div onClick={() => navigate('/pedidos')}>Pedidos</div>
                </nav>
                <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
            </div>

            <div className="content">
                <div className="boxEstadisticas">
                    <div className="estadistica clientes">
                        Clientes: {totalClientes}
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
        </div>
    );
}