// components/register/Register.js
import './registro.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register( { setUser } ) {
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombre === '' || contraseña === '' || confirmarContraseña === '') {
            setError(true);
            return;
        }

        if (contraseña !== confirmarContraseña) {
            setError(true);
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = storedUsers.some(u => u.username === nombre);

        if (userExists) {
            setError(true);
            return;
        }

        storedUsers.push({ username: nombre, password: contraseña });
        localStorage.setItem('users', JSON.stringify(storedUsers));

        setUser(nombre)
        navigate('/inicio'); // Redirige al formulario de inicio de sesión
    };

    return (
        <section>
            <h1>Registrar</h1>
            <form className='formulario' onSubmit={handleSubmit}>
                <input
                    placeholder='Usuario'
                    type='text'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                <input
                    placeholder='Contraseña'
                    type='password'
                    value={contraseña}
                    onChange={e => setContraseña(e.target.value)}
                />
                <input
                    placeholder='Confirmar Contraseña'
                    type='password'
                    value={confirmarContraseña}
                    onChange={e => setConfirmarContraseña(e.target.value)}
                />
                <button type='submit'>Registrar</button>
            </form>
            {error && <p>Por favor, complete todos los campos correctamente o el usuario ya existe.</p>}
        </section>
    );
}
