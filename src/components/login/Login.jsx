// components/login/Login.js
import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ setUser }) {
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [recordar, setRecordar] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.username === nombre && user.password === contraseña);

        if (!user) {
            setError(true);
            return;
        }

        setError(false);
        setUser(nombre);

        if (recordar) {
            localStorage.setItem('loggedInUser', nombre);
        } else {
            localStorage.removeItem('loggedInUser');
        }

        navigate('/inicio');
    };

    return (
        <section>
            <h1>Login</h1>
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
                <label>
                    <input 
                        type='checkbox'
                        checked={recordar}
                        onChange={e => setRecordar(e.target.checked)}
                    />
                    Recordarme
                </label>
                <button>Iniciar sesión</button>
            </form>
            {error && <p>Credenciales incorrectas</p>}
        </section>
    );
}
