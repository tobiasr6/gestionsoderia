import './clientes.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Clientes({ user }) {
    const [clientes, setClientes] = useState(() => {
        const savedClientes = localStorage.getItem(`clientes_${user}`);
        return savedClientes ? JSON.parse(savedClientes) : [];
    });
    const [nombre, setNombre] = useState('');
    const [pedido, setPedido] = useState('');
    const [tipo, setTipo] = useState('Agua');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            localStorage.setItem(`clientes_${user}`, JSON.stringify(clientes));
            const totalPedidos = clientes.reduce((sum, cliente) => sum + parseInt(cliente.pedido.split(' ')[0], 10), 0);
            localStorage.setItem(`totalPedidos_${user}`, totalPedidos); 
        }
    }, [clientes, user]);

    const handleAddCliente = (e) => {
        e.preventDefault();
        if (nombre === '' || pedido === '' || isNaN(pedido)) {
            return;
        }

        const nuevoCliente = { nombre, pedido: `${pedido} ${tipo}` };
        setClientes([...clientes, nuevoCliente]);
        setNombre('');
        setPedido('');
        setTipo('Agua');
    };

    const handleGoBack = () => {
        navigate('/inicio');
    };

    return (
        <div className="clientes">
            <h1>Clientes</h1>
            <button onClick={handleGoBack} className="btn-go-back">
                Volver al Inicio
            </button>
            <form className="formulario" onSubmit={handleAddCliente}>
                <input
                    placeholder='Nombre del Cliente'
                    type='text'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                <input
                    placeholder='Cantidad de Pedido'
                    type='number'
                    value={pedido}
                    onChange={e => setPedido(e.target.value)}
                />
                <select
                    value={tipo}
                    onChange={e => setTipo(e.target.value)}
                >
                    <option value="Agua">Agua</option>
                    <option value="Soda">Soda</option>
                </select>
                <button type='submit'>Agregar Cliente</button>
            </form>
            <div className="lista-clientes">
                {clientes.map((cliente, index) => (
                    <div key={index} className="cliente">
                        <h2>{cliente.nombre}</h2>
                        <p>{cliente.pedido}</p>
                    </div>
                ))}
            </div>
            
        </div>
    );
}
