import './Login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ setUser }) {
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [recordar, setRecordar] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const loggedInPassword = localStorage.getItem('loggedInPassword');
        console.log('Usuario y contraseña recuperados:', loggedInUser, loggedInPassword); // Verifica los valores recuperados
        if (loggedInUser) {
            setNombre(loggedInUser);
            setRecordar(true);
        }
        if (loggedInPassword) {
            setContraseña(loggedInPassword);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombre === '' || contraseña === '') {
            setError(true);
            return;
        }

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
            localStorage.setItem('loggedInPassword', contraseña);
            console.log('Usuario y contraseña guardados:', nombre, contraseña); // Verifica los valores guardados
        } else {
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('loggedInPassword');
        }

        navigate('/inicio');
    };

    const handleRegisterClick = () => {
        navigate('/registro'); 
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
                    autoComplete='username'
                    name='username'
                />
                <div className="password-wrapper">
                    <input
                        placeholder='Contraseña'
                        type={mostrarContraseña ? 'text' : 'password'}
                        value={contraseña}
                        onChange={e => setContraseña(e.target.value)}
                        autoComplete='current-password'
                        name='password'
                    />
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setMostrarContraseña(!mostrarContraseña)}
                    >
                        {mostrarContraseña ? 'Ocultar' : 'Mostrar'}
                    </button>
                </div>
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
            <button onClick={handleRegisterClick} className="register-link">
                Registrar
            </button>
            {error && <p>Credenciales incorrectas</p>}
        </section>
    );
}
