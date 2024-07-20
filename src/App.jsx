import './App.css';
import { Login } from './components/login/Login';
import { Inicio } from './components/inicio/Inicio';
import { useState } from 'react';
function App() {

  const [user, setUser] = useState([])

  return (
    <div className="App">

      {
      !user.length > 0 
      ? <Login setUser={setUser}/> 
      : <Inicio user = {user} setUser = {setUser}/>
      }
    </div>
  );
}

export default App;
