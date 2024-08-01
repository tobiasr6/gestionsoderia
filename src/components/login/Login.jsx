import './Login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import sodappImage from './img/SODAPP.png';

export function Login({ setUser }) {
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const loggedInPassword = localStorage.getItem('loggedInPassword');
        if (loggedInUser) {
            setNombre(loggedInUser);
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

        navigate('/inicio');
    };

    const handleRegisterClick = () => {
        navigate('/registro'); 
    };

    return (
        <section>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                />
            </Helmet>
            <div className="image">
                <img src={sodappImage} alt="Logo" />
            </div>
            <h1>¡Bienvenido!</h1>
            <form className="formulario" onSubmit={handleSubmit}>
                <input 
                    placeholder="Usuario"
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    autoComplete="username"
                    name="username"
                />
                <div className="password-wrapper">
                    <input
                        placeholder="Contraseña"
                        type={mostrarContraseña ? "text" : "password"}
                        value={contraseña}
                        onChange={e => setContraseña(e.target.value)}
                        autoComplete="current-password"
                        name="password"
                    />
                    <span
                        className="material-symbols-outlined toggle-password"
                        onClick={() => setMostrarContraseña(!mostrarContraseña)}
                    >
                        {mostrarContraseña ? 'visibility_off' : 'visibility'}
                    </span>
                </div>
                <div className="botones">
                    <button type="submit" className="btn btn-login">Iniciar sesión</button>
                    <button onClick={handleRegisterClick} className="btn btn-register">Registrar</button>
                </div>
            </form>
            
            {error && <p>Credenciales incorrectas</p>}
        </section>
    );
}
