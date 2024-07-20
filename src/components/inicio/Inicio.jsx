import './inicio.css';

export function Inicio({ user, setUser }) {
    const handleLogout = () => {
        setUser([]);
    };

    return (
        <div className="inicio">
            <h1>Bienvenido</h1>
            <h2>{user}</h2>
            <button onClick={handleLogout}>Cerrar sesión</button>

            <div className="boxEstadisticas">
                <div className="estadistica clientes">
                    Clientes
                </div>
                <div className="estadistica entregas">
                    Entregas
                </div>
                <div className="estadistica zonas">
                    Zonas
                </div>
                <div className="estadistica pedidos">
                    Pedidos
                </div>
            </div>
        </div>
    );
}
