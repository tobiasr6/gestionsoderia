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
    const [dia, setDia] = useState('Lunes');
    const [editingIndex, setEditingIndex] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            localStorage.setItem(`clientes_${user}`, JSON.stringify(clientes));
            const totalPedidos = clientes.reduce((sum, cliente) => sum + parseInt(cliente.pedido.split(' ')[0], 10), 0);
            localStorage.setItem(`totalPedidos_${user}`, totalPedidos);
        }
    }, [clientes, user]);

    const handleAddOrEditCliente = (e) => {
        e.preventDefault();
        if (nombre === '' || pedido === '' || isNaN(pedido)) {
            return;
        }

        const nuevoCliente = { nombre, pedido: `${pedido} ${tipo}`, dia };

        if (editingIndex !== null) {
            const updatedClientes = [...clientes];
            updatedClientes[editingIndex] = nuevoCliente;
            setClientes(updatedClientes);
            setEditingIndex(null);
        } else {
            setClientes([...clientes, nuevoCliente]);
        }

        setNombre('');
        setPedido('');
        setTipo('Agua');
        setDia('Lunes');
    };

    const handleEditCliente = (index) => {
        const cliente = clientes[index];
        setNombre(cliente.nombre);
        setPedido(cliente.pedido.split(' ')[0]);
        setTipo(cliente.pedido.split(' ')[1]);
        setDia(cliente.dia);
        setEditingIndex(index);
    };

    const handleDeleteCliente = (index) => {
        const confirmation = window.confirm("¿Estás seguro de que quieres eliminar este cliente?");
        if (confirmation) {
            const updatedClientes = clientes.filter((_, i) => i !== index);
            setClientes(updatedClientes);
        }
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
            <form className="formulario" onSubmit={handleAddOrEditCliente}>
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
                <div className="selects">
                    <select
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                    >
                        <option value="Agua">Agua</option>
                        <option value="Soda">Soda</option>
                    </select>
                    <select
                        value={dia}
                        onChange={e => setDia(e.target.value)}
                    >
                        <option value="Lunes">Lunes</option>
                        <option value="Martes">Martes</option>
                        <option value="Miercoles">Miercoles</option>
                        <option value="Jueves">Jueves</option>
                        <option value="Viernes">Viernes</option>
                        <option value="Sabado">Sabado</option>
                    </select>
                </div>
                <button type='submit'>{editingIndex !== null ? 'Guardar Cambios' : 'Agregar Cliente'}</button>
            </form>
            <div className="lista-clientes">
                {clientes.map((cliente, index) => (
                    <div key={index} className="cliente">
                        <h2>{cliente.nombre}</h2>
                        <p>{cliente.pedido}</p>
                        <p>Dia de entrega: {cliente.dia}</p>
                        <div className="botones">
                        <button onClick={() => handleEditCliente(index)}>Editar</button>
                        <button onClick={() => handleDeleteCliente(index)}>Eliminar</button>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
