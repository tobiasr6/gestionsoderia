import { useState, useEffect } from 'react';
import './entregas.css';
import { useNavigate } from 'react-router-dom';

const getDayOfWeek = () => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const now = new Date();
    return days[now.getDay()];
};

const countPedidosByDay = (clientes) => {
    const count = {
        'Todos': 0,
        'Lunes': 0,
        'Martes': 0,
        'Miercoles': 0,
        'Jueves': 0,
        'Viernes': 0,
        'Sabado': 0
    };
    clientes.forEach(cliente => {
        if (count[cliente.dia] !== undefined) {
            count[cliente.dia]++;
        }
        count['Todos']++; 
    });
    return count;
};

const getBackgroundColor = (estado) => {
    switch (estado) {
        case 'entregada':
            return 'lightgreen';
        case 'no recibida':
            return 'lightcoral';
        case 'pendiente':
            return 'lightyellow';
        default:
            return 'white';
    }
};

export function Entregas({ user }) {
    const [dia, setDia] = useState(getDayOfWeek());
    const [clientes, setClientes] = useState(() => {
        const savedClientes = localStorage.getItem(`clientes_${user}`);
        const parsedClientes = savedClientes ? JSON.parse(savedClientes) : [];
        return parsedClientes.map(cliente => ({
            ...cliente,
            estado: cliente.estado || 'pendiente'
        }));
    });

    const [pedidosPorDia, setPedidosPorDia] = useState(countPedidosByDay(clientes));

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/inicio');
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem(`clientes_${user}`, JSON.stringify(clientes));
        }
        setPedidosPorDia(countPedidosByDay(clientes));
    }, [clientes, user]);

    const handleEstadoChange = (index, newEstado) => {
        const updatedClientes = [...clientes];
        updatedClientes[index].estado = newEstado;
        setClientes(updatedClientes);
        localStorage.setItem(`clientes_${user}`, JSON.stringify(updatedClientes));
    };

    const clientesFiltrados = dia === 'Todos' ? clientes : clientes.filter(cliente => cliente.dia === dia);

    return (
        <div className="entrega">
            <h1>Entregas</h1>
            <button onClick={handleGoBack} className="btn-go-back">
                Volver al Inicio
            </button>

            <select
                value={dia}
                onChange={e => setDia(e.target.value)}
            >
                {Object.keys(pedidosPorDia).map((day) => (
                    <option key={day} value={day}>
                        {day} ({pedidosPorDia[day]})
                    </option>
                ))}
            </select>

            <div className="lista-clientes">
                {clientesFiltrados.map((cliente, index) => (
                    <div
                        key={index}
                        className="cliente"
                        style={{ backgroundColor: getBackgroundColor(cliente.estado) }}
                    >
                        <h2>{cliente.pedido}</h2>
                        <p>Cliente: {cliente.nombre}</p>
                        <p>Dia de entrega: {cliente.dia}</p>
                        <p>Estado: 
                            <select
                                value={cliente.estado}
                                onChange={e => handleEstadoChange(index, e.target.value)}
                            >
                                <option value="entregada">Entregada</option>
                                <option value="no recibida">No recibida</option>
                                <option value="pendiente">Pendiente</option>
                            </select>
                        </p>
                        <p>Observaciones: {cliente.observaciones}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
