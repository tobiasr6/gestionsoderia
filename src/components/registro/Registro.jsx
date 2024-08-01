// components/register/Register.js
import './registro.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import sodappImage from '../login/img/SODAPP.png';



export function Register( { setUser } ) {
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');

    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);

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
        localStorage.setItem('loggedInUser', nombre);
        navigate('/inicio'); // Redirige al formulario de inicio de sesión
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('loggedInUser');
        navigate('/');
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
            <h1>Registrar</h1>
            <form className='formulario' onSubmit={handleSubmit}>
                <input
                    placeholder='Usuario'
                    type='text'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />

                <div className='contraseña-register'>
                    <input
                        placeholder='Contraseña'
                        type={mostrarContraseña ? "text" : "password"}
                        value={contraseña}
                        onChange={e => setContraseña(e.target.value)}
                    />
                    <span
                        className="material-symbols-outlined toggle-password"
                        onClick={() => setMostrarContraseña(!mostrarContraseña)}
                    >
                        {mostrarContraseña ? 'visibility_off' : 'visibility'}
                    </span>
                </div>

                <div className='confirmarContraseña-register'>
                    <input
                        placeholder='Confirmar Contraseña'
                        type={mostrarConfirmarContraseña ? "text" : "password"}
                        value={confirmarContraseña}
                        onChange={e => setConfirmarContraseña(e.target.value)}
                    />
                    <span
                        className="material-symbols-outlined toggle-password"
                        onClick={() => setMostrarConfirmarContraseña(!mostrarConfirmarContraseña)}
                    >
                        {mostrarConfirmarContraseña ? 'visibility_off' : 'visibility'}
                    </span>
                </div>

                <div className="botones-registro">
                    <button type='submit' className='btn btn-registro'>Registrar</button>
                    <button onClick={handleLogout} className='btn btn-cuenta'>Ya tengo cuenta</button>
                </div>
            </form>
            {error && <p>Por favor, complete todos los campos correctamente o el usuario ya existe.</p>}
        </section>
    );
}
