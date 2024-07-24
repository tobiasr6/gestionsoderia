import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login';
import { Register } from './components/registro/Registro';
import { Inicio } from './components/inicio/Inicio';
import { Clientes } from './components/clientes/Clientes';
import { Pedidos } from './components/pedidos/Pedidos';
import { useState, useEffect } from 'react';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUser(loggedInUser);
        }

        const defaultUsers = [
            { username: 'Tobias', password: '44873598' },
            { username: 'T', password: '1' }
        ];

        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login setUser={setUser} />} />
                <Route path='/inicio' element={<Inicio user={user} setUser={setUser} />} />
                <Route path='/clientes' element={<Clientes user={user} />} />
                <Route path='/registro' element={<Register setUser={setUser} />} />
                <Route path='/pedidos' element={<Pedidos />} />
            </Routes>
        </Router>
    );
}

export default App;
